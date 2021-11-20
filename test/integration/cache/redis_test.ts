import { asserts } from "../dev_deps.ts";
import env from "../../../lib/env/mod.ts";
import cache from "../../../lib/cache/mod.ts";

Deno.test({
  name: "Redis cache driver should get, set and unset cache values in Redis",
  fn: async () => {
    env.set("FRAME_CACHE_DRIVER", "redis");
    env.set("REDIS_URL", new URL("http://localhost:6379"));

    const testKey = "test_key";
    const testValue = "test_value";

    const result1 = await cache.get(testKey);

    asserts.assertEquals(result1, null);

    await cache.set(testKey, testValue);

    const result2 = await cache.get(testKey);

    asserts.assertEquals(result2, testValue);

    await cache.unset(testKey);

    const result3 = await cache.get(testKey);

    asserts.assertEquals(result3, null);

    env.delete("FRAME_CACHE_DRIVER");
    env.delete("REDIS_URL");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
