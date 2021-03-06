import { asserts, mock } from "./dev_deps.ts";
import env from "./env.ts";
import internalCache from "./internal_cache.ts";

/* env.load() */
Deno.test("env.load() should set the correct value to the cache", async () => {
  const key1 = "TEST_1";
  const key2 = "TEST_2";
  const key3 = "TEST_3";
  const value1 = "test1";
  const value2 = "test2";

  Deno.env.set(key1, value1);
  Deno.env.set(key2, value2);

  await env.load({
    [key1]: "string",
    [key2]: { as: "string" },
    [key3]: "string",
  });

  asserts.assert(
    internalCache.has(key1),
    `internalCache has no value for "${key1}"`,
  );
  asserts.assertEquals(
    internalCache.get(key1),
    value1,
    `internalCache value for "${key1}" is ${internalCache.get(key1)}`,
  );
  asserts.assert(
    internalCache.has(key2),
    `internalCache has no value for "${key2}"`,
  );
  asserts.assertEquals(
    internalCache.get(key2),
    value2,
    `internalCache value for "${key2}" is ${internalCache.get(key2)}`,
  );
  asserts.assertEquals(
    internalCache.get(key3),
    undefined,
    `internalCache value for "${key3}" is ${internalCache.get(key3)}`,
  );

  Deno.env.delete(key1);
  Deno.env.delete(key2);
});

Deno.test("env.load() should return the given default value if a value isn't set in environment variables", async () => {
  const key = "TEST";
  const value = "test";

  await env.load({ [key]: { as: "string", default: value } });

  const result = env.get(key);

  asserts.assertEquals(result, value);
});

Deno.test("env.load() should use the given 'options.driver' to preload environment variables", async () => {
  const key = "TEST";
  const value = "test";
  const driver = {
    load: mock.spy(),
  };

  await env.load({ [key]: { as: "string", default: value } }, { driver });

  asserts.assertEquals(
    driver.load.calls[0]?.args,
    [{ [key]: { as: "string", default: value } }],
  );
});

Deno.test("env.load() should throw when an invalid value is parsed from environment variables", async () => {
  const key = "TEST";
  const value = "test";

  Deno.env.set(key, value);

  await asserts.assertRejects(
    () => env.load({ [key]: { as: "string", enum: ["other"] } }),
    Error,
    `"${key}" should be one of other`,
  );

  Deno.env.delete(key);
});

Deno.test("env.load() should throw when a required value is not set in environment variables", async () => {
  const key = "TEST";

  await asserts.assertRejects(
    () => env.load({ [key]: { as: "string", required: true } }),
    Error,
    `"${key}" is a required value`,
  );
});

/* env.get() */
Deno.test("env.get() should return the correct value for the given 'key' argument", () => {
  const key = "TEST";
  const value = "test";

  internalCache.set(key, value);

  const res = env.get(key);

  asserts.assertEquals(res, value, `Value returned from env.get() is ${res}`);

  internalCache.delete(key);
});

Deno.test("env.get() should return the 'default' argument for the given 'key' argument when it is not set", () => {
  const key = "TEST";
  const value = "test";

  const res = env.get(key, value);

  asserts.assertEquals(res, value, `Value returned from env.get() is ${res}`);
});

/* env.set() */
Deno.test("set() should set the given 'value' argument to the given 'key' argument", () => {
  const key = "TEST";
  const value = "test";

  env.set(key, value);

  asserts.assert(
    internalCache.has(key),
    `internalCache has no value for ${key}`,
  );
  asserts.assertEquals(
    internalCache.get(key),
    value,
    `internalCache value for "${key}" is ${internalCache.get(key)}`,
  );
});

/* env.unset() */
Deno.test("env.delete() should delete the given 'key' argument", () => {
  const key = "TEST";
  const value = "test";

  env.set(key, value);

  asserts.assertEquals(env.get(key), value);

  env.unset(key);

  asserts.assertEquals(
    internalCache.get(key),
    undefined,
    `internalCache value for "${key}" is ${internalCache.get(key)}`,
  );
});
