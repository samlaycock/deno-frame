import { env } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import { getQueueDriver } from "./util.ts";

/* getQueueDriver() */
Deno.test("getQueueDriver() should return the correct driver when FRAME_QUEUE_DRIVER is set", () => {
  env.set("FRAME_QUEUE_DRIVER", "test");

  const result = getQueueDriver();

  asserts.assertEquals(result, "test");

  env.unset("FRAME_QUEUE_DRIVER");
});

Deno.test("getQueueDriver() should return the correct driver when QUEUE_DRIVER is set", () => {
  env.set("QUEUE_DRIVER", "test");

  const result = getQueueDriver();

  asserts.assertEquals(result, "test");

  env.unset("QUEUE_DRIVER");
});

Deno.test("getQueueDriver() should return the correct default driver when FRAME_QUEUE_DRIVER and QUEUE_DRIVER are not set", () => {
  const result = getQueueDriver();

  asserts.assertEquals(result, "sqs");
});
