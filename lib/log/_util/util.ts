import { env } from "../deps.ts";
import { LOG_DRIVERS, LOG_LEVELS } from "../constants.ts";
import type { LogDriverType, LoggerOptions, LogLevel } from "../types.d.ts";

env.config({
  FRAME_LOG_DRIVER: {
    as: "string",
    enum: LOG_DRIVERS,
  },
  LOG_DRIVER: {
    as: "string",
    enum: LOG_DRIVERS,
  },
  FRAME_LOG_LEVEL: {
    as: "string",
    enum: LOG_LEVELS,
  },
  LOG_LEVEL: {
    as: "string",
    enum: LOG_LEVELS,
  },
});

export function formatNamespace(namespace: string): string {
  return `[${namespace}]`;
}

export function getLogDriver(): LogDriverType {
  const logDriver = env.get("FRAME_LOG_DRIVER") ||
    env.get("LOG_DRIVER") ||
    "console";

  return logDriver as LogDriverType;
}

export function getLogLevel(): LogLevel {
  const logLevel = env.get("FRAME_LOG_LEVEL") ||
    env.get("LOG_LEVEL") ||
    "info";

  return logLevel as LogLevel;
}

export function getLoggerOptions(
  args: Array<unknown | LoggerOptions>,
): LoggerOptions | null {
  const last = args[args.length - 1] as LoggerOptions;

  if (
    typeof last === "object" &&
    Object.keys(last).length > 0 &&
    Object.keys(last).length <= 2 &&
    (typeof last.namespace === "string" ||
      (typeof last.driver === "string" || typeof last.driver === "object"))
  ) {
    return last;
  }

  return null;
}
