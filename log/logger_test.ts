import { env } from "./deps.ts";
import { asserts, mock } from "./dev_deps.ts";
import {
  DEBUG_PREFIX,
  ERROR_PREFIX,
  INFO_PREFIX,
  WARN_PREFIX,
} from "./constants.ts";
import { debug, error, info, warn } from "./logger.ts";

/* debug() */
Deno.test("debug() should log only when FRAME_LOG_LEVEL is debug, warn or error", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "info");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).length,
    0,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${DEBUG_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${DEBUG_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[2]?.args,
    [`${DEBUG_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    3,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[3]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});

Deno.test("debug() should log only when LOG_LEVEL is debug, warn or error", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("LOG_LEVEL", "info");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).length,
    0,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${DEBUG_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${DEBUG_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[2]?.args,
    [`${DEBUG_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  debug("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    3,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[3]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  console.log = log;
});

Deno.test("debug() should log correctly when given a namespace argument", () => {
  const log = console.log;
  const namespace = "test";

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "debug");

  debug("test", { namespace });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`[${namespace}] ${DEBUG_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});

/* error() */
Deno.test("error() should log only when FRAME_LOG_LEVEL is not none", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "info");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[2]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[3]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[3]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    4,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[4]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});

Deno.test("error() should log only when LOG_LEVEL is not none", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("LOG_LEVEL", "info");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[2]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[3]?.args,
    [`${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[3]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  error("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    4,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[4]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  console.log = log;
});

Deno.test("error() should log correctly when given a namespace argument", () => {
  const log = console.log;
  const namespace = "test";

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "error");

  error("test", { namespace });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`[${namespace}] ${ERROR_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});

/* info() */
Deno.test("info() should log only when FRAME_LOG_LEVEL is info, debug, warn or error", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "info");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[2]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[3]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[3]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    4,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[4]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});

Deno.test("info() should log only when LOG_LEVEL is info, debug, warn or error", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("LOG_LEVEL", "info");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[2]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[3]?.args,
    [`${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[3]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  info("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    4,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[4]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  console.log = log;
});

Deno.test("info() should log correctly when given a namespace argument", () => {
  const log = console.log;
  const namespace = "test";

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "info");

  info("test", { namespace });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`[${namespace}] ${INFO_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});

/* warn */
Deno.test("warn() should log only when FRAME_LOG_LEVEL is warn or error", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "info");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    0,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "info"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "debug");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    0,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "debug"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "warn");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${WARN_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "warn"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "error");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${WARN_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "error"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  env.set("FRAME_LOG_LEVEL", "none");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    2,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with FRAME_LOG_LEVEL set to "none"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});

Deno.test("warn() should log only when LOG_LEVEL is warn or error", () => {
  const log = console.log;

  console.log = mock.spy();

  env.set("LOG_LEVEL", "info");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    0,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "info"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "debug");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    0,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "debug"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "warn");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`${WARN_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with LOG_LEVEL set to "warn"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "error");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[1]?.args,
    [`${WARN_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[1]
        ?.args.join(", ")
    } with LOG_LEVEL set to "error"`,
  );

  env.unset("LOG_LEVEL");

  env.set("LOG_LEVEL", "none");

  warn("test", { driver: "console" });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls.length,
    2,
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[2]
        ?.args.join(", ")
    } with LOG_LEVEL set to "none"`,
  );

  env.unset("LOG_LEVEL");

  console.log = log;
});

Deno.test("warn() should log correctly when given a namespace argument", () => {
  const log = console.log;
  const namespace = "test";

  console.log = mock.spy();

  env.set("FRAME_LOG_LEVEL", "warn");

  warn("test", { namespace });

  asserts.assertEquals(
    (console.log as mock.Spy<void>).calls[0]?.args,
    [`[${namespace}] ${WARN_PREFIX} - `, "test"],
    `console.log was called with ${
      (console.log as mock.Spy<void>).calls[0]
        ?.args.join(", ")
    } with namespace set to "${namespace}"`,
  );

  env.unset("FRAME_LOG_LEVEL");

  console.log = log;
});
