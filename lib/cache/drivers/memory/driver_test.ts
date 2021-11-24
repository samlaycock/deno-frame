import { asserts } from "../../dev_deps.ts";
import memoryDriver from "./driver.ts";

/* memoryDriver.get() */
Deno.test("memoryDriver.get() should return the given key's value from memory if it exists", () => {
  const key = "test";
  const value = "test";

  memoryDriver.set(key, value);

  const result = memoryDriver.get(key);

  asserts.assertEquals(result, value);

  memoryDriver.unset(key);
});

Deno.test("memoryDriver.get() should return null when the given key has no value in memory", () => {
  const key = "test";

  const result = memoryDriver.get(key);

  asserts.assertEquals(result, null);
});

/* memoryDriver.set() */
Deno.test("memoryDriver.set() should set the given value to the given key in memory", () => {
  const key = "test";
  const value = "test";

  memoryDriver.set(key, value);

  const result = memoryDriver.get(key);

  asserts.assertEquals(result, value);

  memoryDriver.unset(key);
});

/* memoryDriver.unset() */

Deno.test("memoryDriver.unset() should delete the given value to the given key from memory", () => {
  const key = "test";
  const value = "test";

  memoryDriver.set(key, value);

  const result1 = memoryDriver.get(key);

  asserts.assertEquals(result1, value);

  memoryDriver.unset(key);

  const result2 = memoryDriver.get(key);

  asserts.assertEquals(result2, null);
});
