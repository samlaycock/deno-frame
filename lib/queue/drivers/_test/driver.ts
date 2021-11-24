import { mock } from "../../dev_deps.ts";

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
};
