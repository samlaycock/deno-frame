export interface QueueDriver {
  name: string;
  consumeQueue: (
    queue: string,
    options: ConsumeQueueOptions,
  ) => Promise<QueueDriverController>;
  createQueueJob: (
    queue: string,
    queueJob: CreateQueueJobData,
  ) => Promise<void>;
}

export interface QueueDriverController {
  stop: () => void | Promise<void>;
}

export type QueueDriverType = "sqs" | "test";

export interface QueueJob {
  id: string;
  body: Record<string, unknown> | string | undefined;
  metadata: Record<string, unknown>;
}

export interface CreateQueueJobData {
  id?: string;
  body: Record<string, unknown> | string | undefined;
  metadata?: Record<string, unknown>;
}

export interface CreateAWSLambdaHandlerOptions {
  context?:
    | Record<string, unknown>
    | (() => Record<string, unknown> | Promise<Record<string, unknown>>);
  onQueueJob: (
    queueJob: QueueJob,
    context: Record<string, unknown>,
  ) => void | Promise<void>;
  onSuccess?: (
    queueJob: QueueJob,
    context: Record<string, unknown>,
  ) => void | Promise<void>;
  onError?: (
    error: Error,
    queueJob: QueueJob,
    context: Record<string, unknown>,
  ) => void | Promise<void>;
}

export interface ConsumeQueueOptions {
  driver?: QueueDriverType | QueueDriver;
  context?:
    | Record<string, unknown>
    | (() => Record<string, unknown> | Promise<Record<string, unknown>>);
  limit?: number;
  interval?: number;
  onQueueJob: (
    queueJob: QueueJob,
    context: Record<string, unknown>,
  ) => void | Promise<void>;
  onSuccess?: (
    queueJob: QueueJob,
    context: Record<string, unknown>,
  ) => void | Promise<void>;
  onError?: (
    error: Error,
    queueJob: QueueJob,
    context: Record<string, unknown>,
  ) => void | Promise<void>;
}

export interface CreateQueueJobOptions {
  driver?: QueueDriverType | QueueDriver;
}
