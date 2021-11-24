import type { CreateAWSLambdaHandlerOptions } from "./types.d.ts";

interface SQSMessage {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: {
    ApproximateReceiveCount: string;
    SentTimestamp: string;
    SenderId: string;
    ApproximateFirstReceiveTimestamp: string;
  };
  messageAttributes: Record<string, unknown>;
  md5OfBody: string;
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
}

interface SQSLambdaEvent {
  Records: Array<SQSMessage>;
}

export default function createAWSLambdaHandler(
  options: CreateAWSLambdaHandlerOptions,
) {
  const { context, onQueueJob, onSuccess, onError } = options;

  return async function (event: SQSLambdaEvent) {
    const { Records } = event;
    const queueJobs = Records.map((record) => {
      let queueBody = record.body;

      try {
        queueBody = JSON.parse(queueBody);
        // deno-lint-ignore no-empty
      } catch (_) {}

      return {
        id: record.messageId,
        body: queueBody,
        metadata: record.messageAttributes || {},
      };
    });
    let queueContext = context || {};

    if (typeof queueContext === "function") {
      queueContext = await queueContext();
    }

    for (const queueJob of queueJobs) {
      try {
        await onQueueJob(queueJob, queueContext);
      } catch (error) {
        if (typeof onError === "function") {
          await onError(error, queueJob, queueContext);
        }
      }

      try {
        if (typeof onSuccess === "function") {
          await onSuccess(queueJob, queueContext);
        }
        // deno-lint-ignore no-empty
      } catch (_) {}
    }
  };
}
