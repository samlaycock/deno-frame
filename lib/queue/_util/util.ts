import { env } from "../deps.ts";
import { QUEUE_DRIVERS } from "../constants.ts";
import type { QueueDriverType } from "../types.d.ts";

env.config({
  FRAME_QUEUE_DRIVER: {
    as: "enum",
    valid: QUEUE_DRIVERS,
  },
  QUEUE_DRIVER: {
    as: "enum",
    valid: QUEUE_DRIVERS,
  },
});

export function getQueueDriver(): QueueDriverType {
  const logDriver = env.get("FRAME_QUEUE_DRIVER") ||
    env.get("QUEUE_DRIVER") ||
    "sqs";

  return logDriver as QueueDriverType;
}
