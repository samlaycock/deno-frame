import { asserts, mock } from "../../dev_deps.ts";
import consoleDriver from "./driver.ts";

Deno.test("consoleDriver.log() should call console.log()", () => {
  const log = console.log;

  console.log = mock.spy();

  consoleDriver.log("test");

  asserts.assertEquals((console.log as mock.Spy<void>).calls[0]?.args, [
    "test",
  ]);

  console.log = log;
});
