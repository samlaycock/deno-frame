import { asserts } from "../dev_deps.ts";
import env from "../../../lib/env/mod.ts";
import queue from "../../../lib/queue/mod.ts";
import { sleep } from "../_util/util.ts";

Deno.test({
  name: "SQS queue driver should receive and process queue messages from SQS",
  fn: async () => {
    env.set("FRAME_QUEUE_DRIVER", "sqs");
    env.set("AWS_DEFAULT_REGION", "test");
    env.set("AWS_ACCESS_KEY_ID", "access_key_id");
    env.set("AWS_SECRET_ACCESS_KEY", "secret_access_key");
    env.set("SQS_URL", new URL("http://localhost:9324"));

    const queueName = "test";
    const processed: Array<unknown> = [];
    const queueJobs = [
      { body: "test_1" },
      { body: "test_2" },
      { body: "test_3" },
    ];

    for (const queueJob of queueJobs) {
      await queue.createQueueJob(queueName, queueJob);
    }

    const queueController = await queue.consumeQueue(queueName, {
      onQueueJob: (job) => {
        if (job.body === "test_3") {
          throw new Error();
        } else if (job.body === "test_1") {
          processed.push({ body: job.body });
        }
      },
      onSuccess: (job) => {
        if (job.body === "test_2") {
          processed.push({ body: job.body });
        }
      },
      onError: (_, job) => {
        processed.push({ body: job.body });
      },
    });

    await sleep(5 * 1000);
    await queueController.stop();

    asserts.assertEquals(queueJobs, processed);

    env.delete("FRAME_QUEUE_DRIVER");
    env.delete("AWS_DEFAULT_REGION");
    env.delete("AWS_ACCESS_KEY_ID");
    env.delete("AWS_SECRET_ACCESS_KEY");
    env.delete("SQS_URL");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
