import drivers from "./drivers/map.ts";
import {
  formatNamespace,
  getLogDriver,
  getLoggerOptions,
  getLogLevel,
} from "./_util/util.ts";
import {
  DEBUG_PREFIX,
  ERROR_PREFIX,
  INFO_PREFIX,
  WARN_PREFIX,
} from "./constants.ts";
import type { LoggerOptions, LogLevel } from "./types.d.ts";

function processLog(
  items: Array<unknown | LoggerOptions>,
  allowed: Array<LogLevel>,
  prefix: string,
) {
  const logDriverType = getLogDriver();
  const logLevel = getLogLevel();

  if (allowed.includes(logLevel)) {
    const options = getLoggerOptions(items);

    if (options) {
      items.pop();

      const { namespace, driver } = options;
      const logDriver = typeof driver === "object"
        ? driver
        : drivers[driver || logDriverType];

      if (namespace) {
        logDriver.log(`${formatNamespace(namespace)} ${prefix} -`, ...items);
      } else {
        logDriver.log(`${prefix} -`, ...items);
      }
    }
  }
}

export function info(...args: Array<unknown | LoggerOptions>): void {
  processLog(args, ["info", "debug", "warn", "error"], INFO_PREFIX);
}

export function debug(...args: Array<string | LoggerOptions>): void {
  processLog(args, ["debug", "warn", "error"], DEBUG_PREFIX);
}

export function warn(...args: Array<string | LoggerOptions>): void {
  processLog(args, ["warn", "error"], WARN_PREFIX);
}

export function error(...args: Array<string | LoggerOptions>): void {
  processLog(args, ["info", "debug", "warn", "error"], ERROR_PREFIX);
}

export default { info, debug, warn, error };
