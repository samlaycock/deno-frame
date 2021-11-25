import { env } from "./deps.ts";
import { asserts, mock } from "./dev_deps.ts";
import queue from "./queue.ts";
import testDriver from "./drivers/_test/driver.ts";
import type { QueueDriverType } from "./types.d.ts";

/* queue.consumeQueue() */
Deno.test("queue.consumeQueue() should use given 'driver'", async () => {
  const queueName = "test";
  const options = {
    driver: "test" as QueueDriverType,
    onQueueJob: () => {},
  };

  await queue.consumeQueue(queueName, options);

  asserts.assertEquals(
    (testDriver.consumeQueue as mock.Spy<void>).calls[0]?.args,
    [
      queueName,
      options,
    ],
  );

  testDriver.reset();
});

Deno.test("queue.consumeQueue() should call the given 'option.driver's consumeQueue method", async () => {
  env.set("FRAME_QUEUE_DRIVER", "test");

  const driver = {
    name: "test",
    consumeQueue: mock.spy(),
    createQueueJob: async () => {},
  };
  const queueName = "test";
  const options1 = {
    driver,
    onQueueJob: () => {},
  };
  const options2 = {
    driver: "test" as QueueDriverType,
    onQueueJob: () => {},
  };
  const options3 = {
    onQueueJob: () => {},
  };

  await queue.consumeQueue(queueName, options1);
  await queue.consumeQueue(queueName, options2);
  await queue.consumeQueue(queueName, options3);

  asserts.assertEquals(driver.consumeQueue.calls[0]?.args, [
    queueName,
    options1,
  ]);
  asserts.assertEquals(testDriver.consumeQueue.calls[0]?.args, [
    queueName,
    options2,
  ]);
  asserts.assertEquals(testDriver.consumeQueue.calls[1]?.args, [
    queueName,
    options3,
  ]);

  env.unset("FRAME_QUEUE_DRIVER");
});

Deno.test("queue.consumeQueue() should call 'options.context' if it is a function", async () => {
  const context = mock.spy();
  const queueName = "test";
  const options = {
    driver: "test" as QueueDriverType,
    context,
    onQueueJob: () => {},
  };

  await queue.consumeQueue(queueName, options);

  asserts.assertEquals(context.calls.length, 1);
});

/* queue.createQueueJob() */
Deno.test("queue.createQueueJob() should", async () => {
  const queueName = "test";
  const queueJob = {
    body: "test",
  };

  await queue.createQueueJob(queueName, queueJob, { driver: "test" });

  asserts.assertEquals(testDriver.createQueueJob.calls[0]?.args, [
    queueName,
    queueJob,
  ]);

  testDriver.reset();
});

Deno.test("queue.createQueueJob() should call the given 'option.driver's createQueueJob method", async () => {
  env.set("FRAME_QUEUE_DRIVER", "test");

  const driver = {
    name: "test",
    consumeQueue: mock.spy(),
    createQueueJob: mock.spy(),
  };
  const queueName = "test";
  const queueJob = {
    body: "test",
  };

  await queue.createQueueJob(queueName, queueJob, { driver });
  await queue.createQueueJob(queueName, queueJob, { driver: "test" });
  await queue.createQueueJob(queueName, queueJob);

  asserts.assertEquals(driver.createQueueJob.calls[0]?.args, [
    queueName,
    queueJob,
  ]);
  asserts.assertEquals(testDriver.createQueueJob.calls[0]?.args, [
    queueName,
    queueJob,
  ]);
  asserts.assertEquals(testDriver.createQueueJob.calls[1]?.args, [
    queueName,
    queueJob,
  ]);

  env.unset("FRAME_QUEUE_DRIVER");
});
