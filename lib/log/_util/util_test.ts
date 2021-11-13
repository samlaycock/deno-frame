import { env } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import { getLoggerOptions, getLogLevel } from "./util.ts";

/* getLoggerOptions() */
Deno.test("getLoggerOptions() should return the given in options object", () => {
  const options = { namespace: "test" };

  const args1 = ["test", options];
  const res1 = getLoggerOptions(args1);

  asserts.assertEquals(
    res1,
    options,
    `getLoggerOptions() returned ${res1} when given ${args1.join(", ")}`,
  );

  const args2 = ["test", { test: true }];
  const res2 = getLoggerOptions(args2);

  asserts.assertEquals(
    res2,
    null,
    `getLoggerOptions() returned ${res2} when given ${args2.join(", ")}`,
  );
});

Deno.test("getLoggerOptions() should return null not given an options object", () => {
  const args = ["test"];
  const res = getLoggerOptions(args);

  asserts.assertEquals(
    res,
    null,
    `getLoggerOptions() returned ${res} when given ${args.join(", ")}`,
  );
});

/* getLoggerLevel() */
Deno.test("getLogLevel() should return FRAME_LOG_LEVEL when set", () => {
  const logLevel = "info";

  env.set("FRAME_LOG_LEVEL", logLevel);
  env.set("LOG_LEVEL", "test");

  const res = getLogLevel();

  asserts.assertEquals(
    res,
    logLevel,
    `getLogLevel() returned ${res} with FRAME_LOG_LEVEL set to "${logLevel}"`,
  );

  env.unset("FRAME_LOG_LEVEL");
  env.unset("LOG_LEVEL");
});

Deno.test("getLogLevel() should return LOG_LEVEL when set", () => {
  const logLevel = "info";

  env.set("LOG_LEVEL", logLevel);

  const res = getLogLevel();

  asserts.assertEquals(
    res,
    logLevel,
    `getLogLevel() returned ${res} with LOG_LEVEL set to "${logLevel}"`,
  );

  env.unset("LOG_LEVEL");
});

Deno.test('getLogLevel() should return "debug" when FRAME_LOG_LEVEL and LOG_LEVEL are not set', () => {
  const res = getLogLevel();

  asserts.assertEquals(
    res,
    "debug",
    `getLogLevel() returned ${res} with FRAME_LOG_LEVEL and LOG_LEVEL not set`,
  );
});
