export interface AWSClientOptions {
  endpoint?: string;
  region?: string;
  credentials?: {
    accessKeyId?: string;
    secretAccessKey?: string;
  };
}

export interface AWSHTTPOptions {
  abortSignal: AbortSignal;
}

// S3
export interface S3ClientConstructor {
  new (options?: AWSClientOptions): S3Client;
}

export interface S3Client {
  createBucket: (options: { Bucket: string }) => Promise<void>;
  getObject: (options: { Bucket: string; Key: string }) => Promise<S3Object>;
  putObject: (
    options: {
      Bucket: string;
      Key: string;
      Body: Uint8Array | ReadableStream<Uint8Array>;
    },
  ) => Promise<void>;
  deleteObject: (options: { Bucket: string; Key: string }) => Promise<void>;
}

export interface S3Object {
  Body: ReadableStream;
}

// SQS
export interface SQSClientConstructor {
  new (options?: AWSClientOptions): SQSClient;
}

export interface SQSClient {
  getQueueUrl: (
    options: { QueueName: string },
    httpOptions?: AWSHTTPOptions,
  ) => Promise<{ QueueUrl: string }>;
  createQueue: (
    options: { QueueName: string },
    httpOptions?: AWSHTTPOptions,
  ) => Promise<{ QueueUrl: string }>;
  receiveMessage: (
    options: {
      QueueUrl: string;
      MaxNumberOfMessages: number;
      WaitTimeSeconds?: number;
    },
    httpOptions?: AWSHTTPOptions,
  ) => Promise<{ Messages: Array<SQSMessage> }>;
  sendMessage: (
    options: {
      QueueUrl: string;
      MessageBody: string;
      MessageAttributes: Record<
        string,
        { DataType: string; StringValue: string }
      >;
    },
    httpOptions?: AWSHTTPOptions,
  ) => Promise<void>;
  deleteMessage: (
    options: {
      QueueUrl: string;
      ReceiptHandle: string;
    },
    httpOptions?: AWSHTTPOptions,
  ) => Promise<void>;
}

export interface SQSMessage {
  MessageId: string;
  Body: string;
  MessageAttributes: Record<string, { DataType: string; StringValue: string }>;
  ReceiptHandle: string;
}
