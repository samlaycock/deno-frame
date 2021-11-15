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

export function formatNamespace(namespace: string): string {
  return `[${namespace}]`;
}

export function getLogDriver(): LogDriverType {
  const logDriver = env.get("FRAME_LOG_DRIVER") ||
    env.get("LOG_DRIVER") ||
    "console";

  return logDriver as LogDriverType;
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
    return last;
  }

  return null;
}
