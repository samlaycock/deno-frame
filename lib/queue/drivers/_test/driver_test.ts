import { asserts } from "../../dev_deps.ts";
import testDriver from "./driver.ts";

Deno.test("testDriver.name should be 'test'", () => {
  asserts.assertEquals(testDriver.name, "test");
});

Deno.test("testDriver.consumeQueue() should call the mocked function", () => {
  const queue = "test";
  const options = { onQueueJob: () => {} };

  testDriver.consumeQueue(queue, options);

  asserts.assertEquals(testDriver.consumeQueue.calls[0]?.args, [
    queue,
    options,
  ]);

  testDriver.reset();
});

Deno.test("testDriver.createQueueJob() should call the mocked function", () => {
  const queue = "test";
  const queueJob = { body: "test" };

  testDriver.createQueueJob(queue, queueJob);

  asserts.assertEquals(testDriver.createQueueJob.calls[0]?.args, [
    queue,
    queueJob,
  ]);

  testDriver.reset();
});

Deno.test("testDriver.reset() should reset the mocked function", () => {
  const queue = "test";
  const options = { onQueueJob: () => {} };
  const queueJob = { body: "test" };

  testDriver.consumeQueue(queue, options);
  testDriver.createQueueJob(queue, queueJob);

  asserts.assertEquals(testDriver.consumeQueue.calls.length, 1);
  asserts.assertEquals(testDriver.createQueueJob.calls.length, 1);

  testDriver.reset();

  asserts.assertEquals(testDriver.consumeQueue.calls.length, 0);
  asserts.assertEquals(testDriver.createQueueJob.calls.length, 0);
});
