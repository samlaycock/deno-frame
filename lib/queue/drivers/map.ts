import sqsDriver from "./sqs/driver.ts";
import testDriver from "./_test/driver.ts";
import type { QueueDriver, QueueDriverType } from "../types.d.ts";

export default {
  sqs: sqsDriver,
  test: testDriver,
} as Record<QueueDriverType, QueueDriver>;
