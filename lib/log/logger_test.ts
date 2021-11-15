import { env } from "./deps.ts";
import { asserts } from "./dev_deps.ts";
import {
  DEBUG_PREFIX,
  ERROR_PREFIX,
  INFO_PREFIX,
  WARN_PREFIX,
} from "./constants.ts";
import { debug, error, info, warn } from "./logger.ts";
import testDriver from "./drivers/_test/driver.ts";

/* debug() */
Deno.test("debug() should log only when FRAME_LOG_LEVEL is debug, warn or error", () => {
  env.set("FRAME_LOG_LEVEL", "info");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.length,
    0,
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[2]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    3,
    `driver.log was called with ${
      testDriver.log.calls[3]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("debug() should log only when LOG_LEVEL is debug, warn or error", () => {
  env.set("LOG_LEVEL", "info");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.length,
    0,
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[2]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  debug("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    3,
    `driver.log was called with ${
      testDriver.log.calls[3]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("debug() should log correctly when given a namespace argument", () => {
  const namespace = "test";

  env.set("FRAME_LOG_LEVEL", "debug");

  debug("test", { namespace, driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`[${namespace}] ${DEBUG_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});

/* error() */
Deno.test("error() should log only when FRAME_LOG_LEVEL is not none", () => {
  env.set("FRAME_LOG_LEVEL", "info");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[2]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[3]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[3]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    4,
    `driver.log was called with ${
      testDriver.log.calls[4]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("error() should log only when LOG_LEVEL is not none", () => {
  env.set("LOG_LEVEL", "info");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[2]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[3]?.args,
    [`${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[3]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  error("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    4,
    `driver.log was called with ${
      testDriver.log.calls[4]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("error() should log correctly when given a namespace argument", () => {
  const namespace = "test";

  env.set("FRAME_LOG_LEVEL", "error");

  error("test", { namespace, driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`[${namespace}] ${ERROR_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});

/* info() */
Deno.test("info() should log only when FRAME_LOG_LEVEL is info, debug, warn or error", () => {
  env.set("FRAME_LOG_LEVEL", "info");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[2]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[3]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[3]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    4,
    `driver.log was called with ${
      testDriver.log.calls[4]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("info() should log only when LOG_LEVEL is info, debug, warn or error", () => {
  env.set("LOG_LEVEL", "info");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[2]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[3]?.args,
    [`${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[3]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  info("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    4,
    `driver.log was called with ${
      testDriver.log.calls[4]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("info() should log correctly when given a namespace argument", () => {
  const namespace = "test";

  env.set("FRAME_LOG_LEVEL", "info");

  info("test", { namespace, driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`[${namespace}] ${INFO_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});

/* warn */
Deno.test("warn() should log only when FRAME_LOG_LEVEL is warn or error", () => {
  env.set("FRAME_LOG_LEVEL", "info");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    0,
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    0,
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${WARN_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${WARN_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    2,
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("warn() should log only when LOG_LEVEL is warn or error", () => {
  env.set("LOG_LEVEL", "info");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    0,
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    0,
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${WARN_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[1]?.args,
    [`${WARN_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  warn("test", { driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls.length,
    2,
    `driver.log was called with ${
      testDriver.log.calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("warn() should log correctly when given a namespace argument", () => {
  const namespace = "test";

  env.set("FRAME_LOG_LEVEL", "warn");

  warn("test", { namespace, driver: "test" });

  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`[${namespace}] ${WARN_PREFIX} -`, "test"],
    `driver.log was called with ${
      testDriver.log.calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  testDriver.reset();
});
