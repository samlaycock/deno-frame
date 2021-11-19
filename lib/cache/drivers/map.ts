import memoryDriver from "./memory/driver.ts";
import redisDriver from "./redis/driver.ts";
import testDriver from "./_test/driver.ts";
import type { CacheDriver, CacheDriverType } from "../types.d.ts";

export default {
  memory: memoryDriver,
  redis: redisDriver,
  test: testDriver,
} as Record<CacheDriverType, CacheDriver>;
