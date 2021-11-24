import { asserts } from "../../dev_deps.ts";
import testDriver from "./driver.ts";

Deno.test("testDriver.name should be 'test'", () => {
  asserts.assertEquals(testDriver.name, "test");
});

Deno.test("testDriver.get() should call the mocked function", () => {
  const key = "test";

  testDriver.get(key);

  asserts.assertEquals(testDriver.get.calls[0]?.args, [key]);

  testDriver.reset();
});

Deno.test("testDriver.set() should call the mocked function", () => {
  const key = "test";
  const value = "test";

  testDriver.set(key, value);

  asserts.assertEquals(testDriver.set.calls[0]?.args, [key, value]);

  testDriver.reset();
});

Deno.test("testDriver.unset() should call the mocked function", () => {
  const key = "test";

  testDriver.unset(key);

  asserts.assertEquals(testDriver.unset.calls[0]?.args, [key]);

  testDriver.reset();
});

Deno.test("testDriver.reset() should reset the mocked function", () => {
  const key = "test";
  const value = "test";

  testDriver.get(key);
  testDriver.set(key, value);
  testDriver.unset(key);

  asserts.assertEquals(testDriver.get.calls.length, 1);
  asserts.assertEquals(testDriver.set.calls.length, 1);
  asserts.assertEquals(testDriver.unset.calls.length, 1);

  testDriver.reset();

  asserts.assertEquals(testDriver.get.calls.length, 0);
  asserts.assertEquals(testDriver.set.calls.length, 0);
  asserts.assertEquals(testDriver.unset.calls.length, 0);
});
