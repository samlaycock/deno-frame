import { env } from "./deps.ts";
import { asserts, mock } from "./dev_deps.ts";
import {
  DEBUG_PREFIX,
  ERROR_PREFIX,
  INFO_PREFIX,
  WARN_PREFIX,
} from "./constants.ts";
import { debug, error, info, warn } from "./logger.ts";
import testDriver from "./drivers/_test/driver.ts";

/* debug() */
Deno.test("logger.debug() should log only when FRAME_LOG_LEVEL is debug, warn or error", () => {
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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.debug() should log only when LOG_LEVEL is debug, warn or error", () => {
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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.debug() should log correctly when given a namespace argument", () => {
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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.debug() should use the given 'options.driver' instance", () => {
  env.set("FRAME_LOG_DRIVER", "test");
  env.set("FRAME_LOG_LEVEL", "debug");

  const driver = {
    name: "test",
    log: mock.spy(),
  };

  debug("test", { driver });
  debug("test", { driver: "test" });
  debug("test");

  asserts.assertEquals(
    driver.log.calls[0]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
  );
  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${DEBUG_PREFIX} -`, "test"],
  );
  // asserts.assertEquals(
  //   testDriver.log.calls[1]?.args,
  //   [`${DEBUG_PREFIX} -`, "test"],
  // );

  env.delete("FRAME_LOG_DRIVER");
  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

/* error() */
Deno.test("logger.error() should log only when FRAME_LOG_LEVEL is not none", () => {
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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.error() should log only when LOG_LEVEL is not none", () => {
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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.error() should log correctly when given a namespace argument", () => {
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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.error() should use the given 'options.driver' instance", () => {
  env.set("FRAME_LOG_DRIVER", "test");
  env.set("FRAME_LOG_LEVEL", "error");

  const driver = {
    name: "test",
    log: mock.spy(),
  };

  error("test", { driver });
  error("test", { driver: "test" });
  error("test");

  asserts.assertEquals(
    driver.log.calls[0]?.args,
    [`${ERROR_PREFIX} -`, "test"],
  );
  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${ERROR_PREFIX} -`, "test"],
  );
  // asserts.assertEquals(
  //   testDriver.log.calls[1]?.args,
  //   [`${ERROR_PREFIX} -`, "test"],
  // );

  env.delete("FRAME_LOG_DRIVER");
  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

/* info() */
Deno.test("logger.info() should log only when FRAME_LOG_LEVEL is info, debug, warn or error", () => {
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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.info() should log only when LOG_LEVEL is info, debug, warn or error", () => {
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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.info() should log correctly when given a namespace argument", () => {
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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.info() should use the given 'options.driver' instance", () => {
  env.set("FRAME_LOG_DRIVER", "test");
  env.set("FRAME_LOG_LEVEL", "info");

  const driver = {
    name: "test",
    log: mock.spy(),
  };

  info("test", { driver });
  info("test", { driver: "test" });
  info("test");

  asserts.assertEquals(
    driver.log.calls[0]?.args,
    [`${INFO_PREFIX} -`, "test"],
  );
  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${INFO_PREFIX} -`, "test"],
  );
  // asserts.assertEquals(
  //   testDriver.log.calls[1]?.args,
  //   [`${INFO_PREFIX} -`, "test"],
  // );

  env.delete("FRAME_LOG_DRIVER");
  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

/* warn */
Deno.test("logger.warn() should log only when FRAME_LOG_LEVEL is warn or error", () => {
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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.warn() should log only when LOG_LEVEL is warn or error", () => {
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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

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

  env.delete("LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.warn() should log correctly when given a namespace argument", () => {
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

  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});

Deno.test("logger.warn() should use the given 'options.driver' instance", () => {
  env.set("FRAME_LOG_DRIVER", "test");
  env.set("FRAME_LOG_LEVEL", "warn");

  const driver = {
    name: "test",
    log: mock.spy(),
  };

  warn("test", { driver });
  warn("test", { driver: "test" });
  warn("test");

  asserts.assertEquals(
    driver.log.calls[0]?.args,
    [`${WARN_PREFIX} -`, "test"],
  );
  asserts.assertEquals(
    testDriver.log.calls[0]?.args,
    [`${WARN_PREFIX} -`, "test"],
  );
  // asserts.assertEquals(
  //   testDriver.log.calls[1]?.args,
  //   [`${WARN_PREFIX} -`, "test"],
  // );

  env.delete("FRAME_LOG_DRIVER");
  env.delete("FRAME_LOG_LEVEL");

  testDriver.reset();
});
