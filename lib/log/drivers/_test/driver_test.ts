import { asserts } from "../../dev_deps.ts";
import testDriver from "./driver.ts";

Deno.test("testDriver.name should be 'test'", () => {
  asserts.assertEquals(testDriver.name, "test");
});

Deno.test("testDriver.log() should call the mocked function", () => {
  testDriver.log("test");

  asserts.assertEquals(testDriver.log.calls[0]?.args, ["test"]);

  testDriver.reset();
});

Deno.test("testDriver.reset() should reset the mocked function", () => {
  testDriver.log("test");

  asserts.assertEquals(testDriver.log.calls.length, 1);

  testDriver.reset();

  asserts.assertEquals(testDriver.log.calls.length, 0);
});
