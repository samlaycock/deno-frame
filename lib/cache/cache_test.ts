import { asserts, mock } from "./dev_deps.ts";
import cache from "./cache.ts";
import testDriver from "./drivers/_test/driver.ts";

/* cache.get() */
Deno.test("cache.get() should return the value for the given key", async () => {
  const key = "test";
  const value = "test";

  const result1 = await cache.get(key, { driver: "test" });

  asserts.assertEquals(result1, null);

  await cache.set(key, value, { driver: "test" });

  const result2 = await cache.get(key, { driver: "test" });

  asserts.assertEquals(result2, value);

  testDriver.reset();
});

Deno.test("cache.get() should use the given 'options.driver'", async () => {
  const key = "test";
  const value = "test";
  const driver = {
    get: mock.spy(() => value),
    set: mock.spy(),
    unset: mock.spy(),
  };
  const result = await cache.get(key, { driver });

  asserts.assertEquals(result, value);
  asserts.assertEquals(driver.get.calls[0].args, [key]);

  testDriver.reset();
});

/* cache.set() */
Deno.test("cache.set() should set the value for the given key", async () => {
  const key = "test";
  const value = "test";

  await cache.set(key, value, { driver: "test" });

  const result = await cache.get(key, { driver: "test" });

  asserts.assertEquals(result, value);

  testDriver.reset();
});

Deno.test("cache.set() should use the given 'options.driver'", async () => {
  const key = "test";
  const value = "test";
  const driver = {
    get: mock.spy(),
    set: mock.spy(),
    unset: mock.spy(),
  };

  await cache.set(key, value, { driver });

  asserts.assertEquals(driver.set.calls[0].args, [key, value]);

  testDriver.reset();
});

/* cache.unset() */
Deno.test("cache.unset() should delete the value for the given key", async () => {
  const key = "test";
  const value = "test";

  await cache.set(key, value, { driver: "test" });

  const result1 = await cache.get(key, { driver: "test" });

  asserts.assertEquals(result1, value);

  await cache.unset(key, { driver: "test" });

  const result2 = await cache.get(key, { driver: "test" });

  asserts.assertEquals(result2, null);

  testDriver.reset();
});

Deno.test("cache.unset() should use the given 'options.driver'", async () => {
  const key = "test";
  const driver = {
    get: mock.spy(),
    set: mock.spy(),
    unset: mock.spy(),
  };

  await cache.unset(key, { driver });

  asserts.assertEquals(driver.unset.calls[0].args, [key]);

  testDriver.reset();
});
