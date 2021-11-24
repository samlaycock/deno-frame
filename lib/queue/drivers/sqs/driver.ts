import { AWS, env } from "../../deps.ts";
import type {
  ConsumeQueueOptions,
  QueueDriver,
  QueueDriverController,
  QueueJob,
} from "../../types.d.ts";

const QUEUE_URL_CACHE = new Map();

await env.load({
  /* Region */
  SQS_AWS_DEFAULT_REGION: "string",
  AWS_DEFAULT_REGION: "string",
  SQS_AWS_REGION: "string",
  AWS_REGION: "string",
  /* Access Key ID */
  SQS_AWS_ACCESS_KEY_ID: "string",
  AWS_ACCESS_KEY_ID: "string",
  /* Secret Access Key */
  SQS_AWS_SECRET_ACCESS_KEY: "string",
  AWS_SECRET_ACCESS_KEY: "string",
  /* SQS */
  SQS_URL: "url",
});

function createSQSClient() {
  const endpoint = env.get("SQS_URL");
  const region = env.get("SQS_AWS_DEFAULT_REGION") ||
    env.get("AWS_DEFAULT_REGION") ||
    env.get("SQS_AWS_REGION") ||
    env.get("AWS_REGION");
  const accessKeyId = env.get("SQS_AWS_ACCESS_KEY_ID") ||
    env.get("AWS_ACCESS_KEY_ID");
  const secretAccessKey = env.get("SQS_AWS_SECRET_ACCESS_KEY") ||
    env.get("AWS_SECRET_ACCESS_KEY");
  const clientOptions = {
    endpoint: endpoint
      ? (endpoint as URL).toString().replace(/\/$/, "")
      : undefined,
    region: region as string | undefined,
    credentials: undefined as undefined | {
      accessKeyId: string;
      secretAccessKey: string;
    },
  };

  if (typeof accessKeyId !== "undefined") {
    clientOptions.credentials = {
      accessKeyId: accessKeyId as string,
      secretAccessKey: secretAccessKey as string,
    };
  }

  const client = new AWS.SQS(clientOptions);

  return client;
}

async function ensureQueue(queue: string) {
  const client = createSQSClient();
  let queueUrl;

  if (!queueUrl) {
    try {
      ({ QueueUrl: queueUrl } = await client.getQueueUrl({ QueueName: queue }));
    } catch (_) {
      ({ QueueUrl: queueUrl } = await client.createQueue({
        QueueName: queue,
        // Attributes: {
        //   FifoQueue: true,
        // },
      }));
    }
  }

  return queueUrl;
}

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
  const client = createSQSClient();
  let queueUrl = QUEUE_URL_CACHE.get(queue);
  let timeout: number;
  let abortController: AbortController;

  if (!queueUrl) {
    queueUrl = await ensureQueue(queue);

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

    if (messages?.length > 0) {
      for (const message of messages) {
        const {
          MessageId: id,
          Body: body,
          MessageAttributes: metadata = {},
        } = message;
        const sqsMetadata = Object.entries(metadata)
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
  const client = createSQSClient();
  let queueUrl = QUEUE_URL_CACHE.get(queue);
  let queueBody = queueJob.body;

  if (!queueUrl) {
    queueUrl = await ensureQueue(queue);

    QUEUE_URL_CACHE.set(queue, queueUrl);
  }

  if (typeof queueBody === "object") {
    queueBody = JSON.stringify(queueBody);
  }

  const sqsMetadata = Object.entries(queueJob.metadata || {}).reduce<
    Record<string, { DataType: string; StringValue: string }>
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
    MessageBody: queueBody as string,
    MessageAttributes: sqsMetadata,
  });
}

export default {
  name: "sqs",
  consumeQueue,
  createQueueJob,
} as QueueDriver;
