import { asserts } from "../../dev_deps.ts";
import testDriver from "./driver.ts";

Deno.test("testDriver.log() should call the mocked function", () => {
  testDriver.log("test");

  asserts.assertEquals(testDriver.log.calls[0]?.args, ["test"]);
});

Deno.test("testDriver.reset() should reset the mocked function", () => {
  testDriver.log("test");

  asserts.assertEquals(testDriver.log.calls[0]?.args, ["test"]);

  testDriver.reset();

  asserts.assertEquals(testDriver.log.calls[0], undefined);
});
