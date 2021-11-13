import { asserts } from "./dev_deps.ts";
import env from "./env.ts";
import internalCache from "./internal_cache.ts";
import { ENV_PARSERS } from "./constants.ts";
import type { EnvParser, EnvParserOptions, EnvValues } from "./types.d.ts";

/* env.config() */
Deno.test("env.config() should set the correct value to the cache", () => {
  const key1 = "TEST_1";
  const key2 = "TEST_2";
  const value1 = "test1";
  const value2 = "test2";

  Deno.env.set(key1, value1);
  Deno.env.set(key2, value2);

  env.config({ [key1]: "string", [key2]: { as: "string" } } as EnvValues);

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

  Deno.env.delete(key1);
  Deno.env.delete(key2);
});

Deno.test("env.config() should throw when given in invalid values argument", () => {
  asserts.assertThrows(
    () =>
      env.config(
        ("invalid" as unknown) as Record<string, EnvParser | EnvParserOptions>,
      ),
    Error,
    "'values' must be an object",
  );
  asserts.assertThrows(
    () =>
      env.config(
        (1 as unknown) as Record<string, EnvParser | EnvParserOptions>,
      ),
    Error,
    "'values' must be an object",
  );
  asserts.assertThrows(
    () =>
      env.config(
        (true as unknown) as Record<string, EnvParser | EnvParserOptions>,
      ),
    Error,
    "'values' must be an object",
  );
  asserts.assertThrows(
    () =>
      env.config(
        (["invalid"] as unknown) as Record<
          string,
          EnvParser | EnvParserOptions
        >,
      ),
    Error,
    "'values' must be an object",
  );
});

Deno.test("env.config() should throw when passed an invalid parser argument", () => {
  const key = "TEST";
  const value = "test";

  Deno.env.set(key, value);

  asserts.assertThrows(
    () => env.config({ [key]: "invalid" as string } as EnvValues),
    Error,
    `Invalid 'parser' "invalid" for "${key}" (must be one of ${
      ENV_PARSERS.join(", ")
    })`,
  );
  asserts.assertThrows(
    () => env.config({ [key]: { as: "invalid" as string } } as EnvValues),
    Error,
    `Invalid 'parser.as' "invalid" for "${key}" (must be one of ${
      ENV_PARSERS.join(", ")
    })`,
  );

  Deno.env.delete(key);
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

Deno.test("env.get() should throw when given an invalid 'key' argument", () => {
  asserts.assertThrows(
    () => env.get((1 as unknown) as string),
    Error,
    "'key' must be a string",
  );
  asserts.assertThrows(
    () => env.get((true as unknown) as string),
    Error,
    "'key' must be a string",
  );
  asserts.assertThrows(
    () => env.get(({} as unknown) as string),
    Error,
    "'key' must be a string",
  );
  asserts.assertThrows(
    () => env.get(([] as unknown) as string),
    Error,
    "'key' must be a string",
  );
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

Deno.test("env.set() should throw when given an invalid 'key' argument", () => {
  const value = "test";

  asserts.assertThrows(
    () => env.set((1 as unknown) as string, value),
    Error,
    "'key' must be a string",
  );
  asserts.assertThrows(
    () => env.set((true as unknown) as string, value),
    Error,
    "'key' must be a string",
  );
  asserts.assertThrows(
    () => env.set(({} as unknown) as string, value),
    Error,
    "'key' must be a string",
  );
  asserts.assertThrows(
    () => env.set(([] as unknown) as string, value),
    Error,
    "'key' must be a string",
  );
});

Deno.test("env.set() should throw when given an invalid 'value' argument", () => {
  const key = "TEST";

  asserts.assertThrows(
    () => env.set(key, undefined),
    Error,
    "'value' must be string, number, boolean, object, Array, RegExp or URL",
  );
  asserts.assertThrows(
    () => env.set(key, null),
    Error,
    "'value' must be string, number, boolean, object, Array, RegExp or URL",
  );
});

/* env.unset() */
