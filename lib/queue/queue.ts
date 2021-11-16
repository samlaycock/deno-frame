import drivers from "./drivers/map.ts";
import { getQueueDriver } from "./_util/util.ts";
import type {
  ConsumeQueueOptions,
  CreateQueueJobData,
  CreateQueueJobOptions,
  QueueDriverController,
} from "./types.d.ts";

export async function consumeQueue(
  queue: string,
  options: ConsumeQueueOptions,
): Promise<QueueDriverController> {
  const queueDriverType = getQueueDriver();
  const queueDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options.driver || queueDriverType];

  options.context = options.context || {};

  if (typeof options.context === "function") {
    options.context = await options.context();
  }

  return queueDriver.consumeQueue(queue, options);
}

export async function createQueueJob(
  queue: string,
  queueJob: CreateQueueJobData,
  options?: CreateQueueJobOptions,
): Promise<void> {
  const queueDriverType = getQueueDriver();
  const queueDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options?.driver || queueDriverType];

  await queueDriver.createQueueJob(queue, queueJob);
}

export default { consumeQueue, createQueueJob };
