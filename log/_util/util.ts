import { env } from "../deps.ts";
import { LOG_DRIVERS, LOG_LEVELS } from "../constants.ts";
import type { LogDriverType, LoggerOptions } from "../types.d.ts";

env.config({
  FRAME_LOG_DRIVER: {
    as: "enum",
    valid: LOG_DRIVERS,
  },
  LOG_DRIVER: {
    as: "enum",
    valid: LOG_DRIVERS,
  },
  FRAME_LOG_LEVEL: {
    as: "enum",
    valid: LOG_LEVELS,
  },
  LOG_LEVEL: {
    as: "enum",
    valid: LOG_LEVELS,
  },
});

export function getLogDriver(): string {
  const logDriver = env.get("FRAME_LOG_DRIVER") ||
    env.get("LOG_DRIVER") ||
    "console";

  return logDriver as string;
}

export function getLogLevel(): string {
  const logLevel = env.get("FRAME_LOG_LEVEL") ||
    env.get("LOG_LEVEL") ||
    "debug";

  return logLevel as string;
}

export function getLoggerOptions(
  args: Array<unknown | LoggerOptions>,
): LoggerOptions | null {
  const last = args[args.length - 1] as LoggerOptions;

  if (
    typeof last === "object" &&
    Object.keys(last).length > 0 &&
    Object.keys(last).length <= 2 &&
    (typeof last.namespace === "string" || typeof last.driver === "string")
  ) {
    if (
      typeof last.driver !== "undefined" &&
      !LOG_DRIVERS.includes(last.driver as LogDriverType)
    ) {
      throw new Error(
        `'options.driver' must be one of ${LOG_DRIVERS.join(", ")}`,
      );
    }

    return last;
  }

  return null;
}
