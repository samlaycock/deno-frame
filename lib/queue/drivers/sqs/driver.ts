import { AWS, env } from "../../deps.ts";
import type {
  ConsumeQueueOptions,
  QueueDriver,
  QueueDriverController,
  QueueJob,
} from "../../types.d.ts";

interface SQSClient {
  getQueueUrl: (
    options: { QueueName: string },
    httpOptions?: { abortSignal: AbortSignal },
  ) => { QueueUrl: string };
  createQueue: (
    options: { QueueName: string },
    httpOptions?: { abortSignal: AbortSignal },
  ) => { QueueUrl: string };
  receiveMessage: (
    options: {
      QueueUrl: string;
      MaxNumberOfMessages?: number;
      WaitTimeSeconds?: number;
    },
    httpOptions?: { abortSignal: AbortSignal },
  ) => { Messages?: Array<SQSMessage> };
  deleteMessage: (options: {
    QueueUrl: string;
    ReceiptHandle: string;
  }, httpOptions?: { abortSignal: AbortSignal }) => Promise<void>;
  sendMessage: (options: {
    QueueUrl: string;
    MessageBody?: string;
    MessageAttributes?: SQSMessageAttribute;
  }, httpOptions?: { abortSignal: AbortSignal }) => Promise<void>;
}

interface SQSClientConfig {
  endpoint: string | undefined;
  region: string | undefined;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

interface SQSMessage {
  MessageId?: string;
  ReceiptHandle?: string;
  MD5OfBody?: string;
  Body: string;
  Attributes?: Record<string, unknown>;
  MD5OfMessageAttributes?: string;
  MessageAttributes?: Record<string, unknown>;
}

interface SQSMessageAttributeValue {
  DataType: string;
  StringValue: string;
}

type SQSMessageAttribute = Record<string, SQSMessageAttributeValue>;

const QUEUE_URL_CACHE = new Map();

env.config({
  /* Access Key ID */
  FRAME_QUEUE_AWS_ACCESS_KEY_ID: "string",
  QUEUE_AWS_ACCESS_KEY_ID: "string",
  AWS_ACCESS_KEY_ID: "string",
  /* Secret Access Key */
  FRAME_QUEUE_AWS_SECRET_ACCESS_KEY: "string",
  QUEUE_AWS_SECRET_ACCESS_KEY: "string",
  AWS_SECRET_ACCESS_KEY: "string",
  /* Region */
  FRAME_QUEUE_AWS_DEFAULT_REGION: "string",
  QUEUE_AWS_DEFAULT_REGION: "string",
  AWS_DEFAULT_REGION: "string",
  AWS_REGION: "string",
  /* SQS */
  SQS_URL: "urlString",
});

async function consumeQueue(
  queue: string,
  options: ConsumeQueueOptions,
): Promise<QueueDriverController> {
  const {
    onQueueJob,
    onSuccess,
    onError,
    context,
    limit = 1,
    interval = 20,
  } = options;
  const endpoint = env.get("SQS_URL");
  const region = env.get("FRAME_QUEUE_AWS_DEFAULT_REGION") ||
    env.get("QUEUE_AWS_DEFAULT_REGION") ||
    env.get("AWS_DEFAULT_REGION") ||
    env.get("AWS_REGION");
  const accessKeyId = env.get("FRAME_QUEUE_AWS_DEFAULT_REGION") ||
    env.get("QUEUE_AWS_DEFAULT_REGION") ||
    env.get("AWS_DEFAULT_REGION") ||
    env.get("AWS_REGION");
  const secretAccessKey = env.get("FRAME_QUEUE_AWS_SECRET_ACCESS_KEY") ||
    env.get("QUEUE_AWS_SECRET_ACCESS_KEY") ||
    env.get("AWS_SECRET_ACCESS_KEY");
  const clientOptions: SQSClientConfig = {
    endpoint: endpoint as string | undefined,
    region: region as string | undefined,
  };
  let timeout: number;
  let abortController: AbortController;

  if (typeof accessKeyId !== "undefined") {
    clientOptions.credentials = {
      accessKeyId: accessKeyId as string,
      secretAccessKey: secretAccessKey as string,
    };
  }

  // deno-lint-ignore no-explicit-any
  const client: SQSClient = new (AWS.SQS as any)({ ...clientOptions });
  let queueUrl = QUEUE_URL_CACHE.get(queue);

  if (!queueUrl) {
    try {
      abortController = new AbortController();

      ({ QueueUrl: queueUrl } = await client.getQueueUrl(
        { QueueName: queue },
        { abortSignal: abortController.signal },
      ));
    } catch (_) {
      try {
        abortController = new AbortController();

        ({ QueueUrl: queueUrl } = await client.createQueue(
          { QueueName: queue },
          { abortSignal: abortController.signal },
        ));
      } catch (error) {
        console.error(error);
      }
    }

    QUEUE_URL_CACHE.set(queue, queueUrl);
  }

  async function runQueueConsumer() {
    abortController = new AbortController();

    const { Messages: messages } = await client.receiveMessage(
      {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: limit,
        WaitTimeSeconds: interval < 20 ? interval : 20,
      },
      { abortSignal: abortController.signal },
    );

    if ((messages as Array<SQSMessage>)?.length > 0) {
      for (const message of messages as Array<SQSMessage>) {
        const {
          MessageId: id,
          Body: body,
          MessageAttributes: metadata = {},
        } = message;
        const sqsMetadata = Object.entries(metadata as SQSMessageAttribute)
          .reduce<
            Record<string, string | number>
          >((result, [key, value]) => {
            result[key] = value.DataType === "Number"
              ? parseInt(value.StringValue, 10)
              : value.StringValue;

            return result;
          }, {});
        let queueJobBody = body;

        try {
          queueJobBody = JSON.parse(queueJobBody as string);
          // deno-lint-ignore no-empty
        } catch (_) {}

        const queueJob = {
          id: id as string,
          body: queueJobBody,
          metadata: sqsMetadata,
        };

        try {
          await onQueueJob(queueJob, context as Record<string, unknown>);
        } catch (error) {
          if (typeof onError === "function") {
            await onError(
              error,
              queueJob,
              context as Record<string, unknown>,
            );
          }
        }

        try {
          if (typeof onSuccess === "function") {
            await onSuccess(queueJob, context as Record<string, unknown>);
          }

          abortController = new AbortController();

          await client.deleteMessage(
            {
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle as string,
            },
            { abortSignal: abortController.signal },
          );
          // deno-lint-ignore no-empty
        } catch (_) {}
      }

      timeout = setTimeout(runQueueConsumer, 10);
    } else {
      timeout = setTimeout(runQueueConsumer, interval * 1000);
    }
  }

  timeout = setTimeout(runQueueConsumer, 1);

  return {
    stop: () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (abortController) {
        abortController.abort();
      }
    },
  };
}

async function createQueueJob(
  queue: string,
  queueJob: QueueJob,
): Promise<void> {
  const endpoint = env.get("SQS_URL");
  const region = env.get("FRAME_QUEUE_AWS_DEFAULT_REGION") ||
    env.get("QUEUE_AWS_DEFAULT_REGION") ||
    env.get("AWS_DEFAULT_REGION") ||
    env.get("AWS_REGION");
  const accessKeyId = env.get("FRAME_QUEUE_AWS_DEFAULT_REGION") ||
    env.get("QUEUE_AWS_DEFAULT_REGION") ||
    env.get("AWS_DEFAULT_REGION") ||
    env.get("AWS_REGION");
  const secretAccessKey = env.get("FRAME_QUEUE_AWS_SECRET_ACCESS_KEY") ||
    env.get("QUEUE_AWS_SECRET_ACCESS_KEY") ||
    env.get("AWS_SECRET_ACCESS_KEY");
  const clientOptions: SQSClientConfig = {
    endpoint: endpoint as string | undefined,
    region: region as string | undefined,
  };

  if (typeof accessKeyId !== "undefined") {
    clientOptions.credentials = {
      accessKeyId: accessKeyId as string,
      secretAccessKey: secretAccessKey as string,
    };
  }

  // deno-lint-ignore no-explicit-any
  const client: SQSClient = new (AWS.SQS as any)({ ...clientOptions });
  let queueUrl = QUEUE_URL_CACHE.get(queue);
  let queueBody = queueJob.body;

  if (!queueUrl) {
    try {
      ({ QueueUrl: queueUrl } = await client.getQueueUrl({ QueueName: queue }));
    } catch (_) {
      try {
        ({ QueueUrl: queueUrl } = await client.createQueue({
          QueueName: queue,
        }));
      } catch (error) {
        console.error(error);
      }
    }

    QUEUE_URL_CACHE.set(queue, queueUrl);
  }

  if (typeof queueBody === "object") {
    queueBody = JSON.stringify(queueBody);
  }

  const sqsMetadata = Object.entries(queueJob.metadata || {}).reduce<
    SQSMessageAttribute
  >(
    (result, [key, value]) => {
      const entry = {
        DataType: typeof value === "number" ? "Number" : "String",
        StringValue: (value as string | number).toString(),
      };

      result[key] = entry;

      return result;
    },
    {},
  );

  await client.sendMessage({
    QueueUrl: queueUrl,
    MessageBody: queueBody,
    MessageAttributes: sqsMetadata,
  });
}

export default {
  name: "sqs",
  consumeQueue,
  createQueueJob,
} as QueueDriver;
