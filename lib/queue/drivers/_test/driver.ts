import { mock } from "../../dev_deps.ts";
import type { QueueDriver } from "../../types.d.ts";

interface TestQueueDriver extends QueueDriver {
  consumeQueue: mock.Spy<void>;
  createQueueJob: mock.Spy<void>;
  reset: () => void;
}

const consumeQueue = mock.spy();
const createQueueJob = mock.spy();

export default {
  name: "test",
  consumeQueue,
  createQueueJob,
  reset() {
    this.consumeQueue = mock.spy();
    this.createQueueJob = mock.spy();
  },
} as TestQueueDriver;
