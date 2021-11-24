import SQS from "./_build/sqs.js";

const SQSClientConstructor = SQS as SQSClientConstructor;

export default SQSClientConstructor;
export { SQSClientConstructor as SQS };

export interface SQSHTTPOptions {
  abortSignal: AbortSignal;
}

export interface SQSClientOptions {
  endpoint?: string;
  region?: string;
  credentials?: {
    accessKeyId?: string;
    secretAccessKey?: string;
  };
}

export interface SQSClientConstructor {
  new (options?: SQSClientOptions): SQSClient;
}

export interface SQSClient {
  getQueueUrl: (
    options: { QueueName: string },
    httpOptions?: SQSHTTPOptions,
  ) => Promise<{ QueueUrl: string }>;
  createQueue: (
    options: { QueueName: string },
    httpOptions?: SQSHTTPOptions,
  ) => Promise<{ QueueUrl: string }>;
  receiveMessage: (
    options: {
      QueueUrl: string;
      MaxNumberOfMessages: number;
      WaitTimeSeconds?: number;
    },
    httpOptions?: SQSHTTPOptions,
  ) => Promise<{ Messages: Array<SQSMessage> }>;
  sendMessage: (
    options: {
      QueueUrl: string;
      MessageBody: string;
      MessageAttributes?: Record<
        string,
        { DataType: string; StringValue: string }
      >;
    },
    httpOptions?: SQSHTTPOptions,
  ) => Promise<void>;
  deleteMessage: (
    options: {
      QueueUrl: string;
      ReceiptHandle: string;
    },
    httpOptions?: SQSHTTPOptions,
  ) => Promise<void>;
}

export interface SQSMessage {
  MessageId: string;
  Body: string;
  MessageAttributes: Record<string, { DataType: string; StringValue: string }>;
  ReceiptHandle: string;
}
