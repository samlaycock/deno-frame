import { env } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import { getCacheDriver } from "./util.ts";

/* getCacheDriver() */
Deno.test("getCacheDriver() should return the correct driver when FRAME_CACHE_DRIVER is set", () => {
  env.set("FRAME_CACHE_DRIVER", "test");

  const result = getCacheDriver();

  asserts.assertEquals(result, "test");

  env.delete("FRAME_CACHE_DRIVER");
});

Deno.test("getCacheDriver() should return the correct driver when CACHE_DRIVER is set", () => {
  env.set("CACHE_DRIVER", "test");

  const result = getCacheDriver();

  asserts.assertEquals(result, "test");

  env.delete("CACHE_DRIVER");
});
