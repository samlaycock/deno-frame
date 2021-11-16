import { asserts, mock } from "./dev_deps.ts";
import queue from "./queue.ts";
import testDriver from "./drivers/_test/driver.ts";
import type { QueueDriverType } from "./types.d.ts";

/* queue.consumeQueue() */
Deno.test("queue.consumeQueue() should use given 'driver'", () => {
  const queueName = "test";
  const options = {
    driver: "test" as QueueDriverType,
    onQueueJob: () => {},
  };

  queue.consumeQueue(queueName, options);

  asserts.assertEquals(
    (testDriver.consumeQueue as mock.Spy<void>).calls[0]?.args,
    [
      queueName,
      options,
    ],
  );

  testDriver.reset();
});

Deno.test("queue.consumeQueue() should call the given 'option.driver's consumeQueue method", () => {
  const driver = {
    name: "test",
    consumeQueue: mock.spy(),
    createQueueJob: async () => {},
  };
  const queueName = "test";
  const options = {
    driver,
    onQueueJob: () => {},
  };

  queue.consumeQueue(queueName, options);

  asserts.assertEquals(driver.consumeQueue.calls[0]?.args, [
    queueName,
    options,
  ]);
});

Deno.test("queue.consumeQueue() should call 'options.context' if it is a function", () => {
  const driver = {
    name: "test",
    consumeQueue: mock.spy(),
    createQueueJob: mock.spy(),
  };
  const context = mock.spy();
  const queueName = "test";
  const options = {
    driver,
    context,
    onQueueJob: () => {},
  };

  queue.consumeQueue(queueName, options);

  asserts.assertEquals(context.calls.length, 1);
});

/* queue.createQueueJob() */
Deno.test("queue.createQueueJob() should", () => {
  const queueName = "test";
  const queueJob = {
    body: "test",
  };

  queue.createQueueJob(queueName, queueJob, { driver: "test" });

  asserts.assertEquals(testDriver.createQueueJob.calls[0]?.args, [
    queueName,
    queueJob,
  ]);

  testDriver.reset();
});

Deno.test("queue.createQueueJob() should call the given 'option.driver's createQueueJob method", () => {
  const driver = {
    name: "test",
    consumeQueue: mock.spy(),
    createQueueJob: mock.spy(),
  };
  const queueName = "test";
  const queueJob = {
    body: "test",
  };

  queue.createQueueJob(queueName, queueJob, { driver });

  asserts.assertEquals(driver.createQueueJob.calls[0]?.args, [
    queueName,
    queueJob,
  ]);
});
