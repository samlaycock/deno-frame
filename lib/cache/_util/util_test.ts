import { env } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import { getCacheDriver } from "./util.ts";

/* getCacheDriver() */
Deno.test("getCacheDriver() should return the correct driver when FRAME_CACHE_DRIVER is set", () => {
  env.set("FRAME_CACHE_DRIVER", "test");

  const result = getCacheDriver();

  asserts.assertEquals(result, "test");

  env.unset("FRAME_CACHE_DRIVER");
});

Deno.test("getCacheDriver() should return the correct driver when CACHE_DRIVER is set", () => {
  env.set("CACHE_DRIVER", "test");

  const result = getCacheDriver();

  asserts.assertEquals(result, "test");

  env.unset("CACHE_DRIVER");
});

Deno.test("getCacheDriver() should return the correct default driver when FRAME_CACHE_DRIVER and CACHE_DRIVER are not set", () => {
  env.unset("FRAME_CACHE_DRIVER");
  env.unset("CACHE_DRIVER");

  const result = getCacheDriver();

  asserts.assertEquals(result, "memory");
});
