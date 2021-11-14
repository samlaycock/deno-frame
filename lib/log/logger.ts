import drivers from "./drivers/map.ts";
import { getLogDriver, getLoggerOptions, getLogLevel } from "./_util/util.ts";
import {
  DEBUG_PREFIX,
  ERROR_PREFIX,
  INFO_PREFIX,
  WARN_PREFIX,
} from "./constants.ts";
import type { LoggerOptions } from "./types.d.ts";

export function info(...args: Array<string | LoggerOptions>): void {
  const logDriver = getLogDriver();
  const logLevel = getLogLevel();

  if (["info", "debug", "warn", "error"].includes(logLevel)) {
    const options = getLoggerOptions(args);

    if (options) {
      args.pop();

      const { namespace, driver } = options;

      if (namespace) {
        drivers[driver || logDriver].log(
          `[${namespace}] ${INFO_PREFIX} -`,
          ...args,
        );
      } else {
        drivers[driver || logDriver].log(
          `${INFO_PREFIX} -`,
          ...args,
        );
      }
    } else {
      drivers[logDriver].log(`${INFO_PREFIX} -`, ...args);
    }
  }
}

export function debug(...args: Array<string | LoggerOptions>): void {
  const logDriver = getLogDriver();
  const logLevel = getLogLevel();

  if (["debug", "warn", "error"].includes(logLevel)) {
    const options = getLoggerOptions(args);

    if (options) {
      args.pop();

      const { namespace, driver } = options;

      if (namespace) {
        drivers[driver || logDriver].log(
          `[${namespace}] ${DEBUG_PREFIX} -`,
          ...args,
        );
      } else {
        drivers[driver || logDriver].log(
          `${DEBUG_PREFIX} -`,
          ...args,
        );
      }
    } else {
      drivers[logDriver].log(`${DEBUG_PREFIX} -`, ...args);
    }
  }
}

export function warn(...args: Array<string | LoggerOptions>): void {
  const logDriver = getLogDriver();
  const logLevel = getLogLevel();

  if (["warn", "error"].includes(logLevel)) {
    const options = getLoggerOptions(args);

    if (options) {
      args.pop();

      const { namespace, driver } = options;

      if (namespace) {
        drivers[driver || logDriver].log(
          `[${namespace}] ${WARN_PREFIX} -`,
          ...args,
        );
      } else {
        drivers[driver || logDriver].log(
          `${WARN_PREFIX} -`,
          ...args,
        );
      }
    } else {
      (drivers[logDriver]).log(`${WARN_PREFIX} -`, ...args);
    }
  }
}

export function error(...args: Array<string | LoggerOptions>): void {
  const logDriver = getLogDriver();
  const logLevel = getLogLevel();

  if (!["none"].includes(logLevel)) {
    const options = getLoggerOptions(args);

    if (options) {
      args.pop();

      const { namespace, driver } = options;

      if (namespace) {
        drivers[driver || logDriver].log(
          `[${namespace}] ${ERROR_PREFIX} -`,
          ...args,
        );
      } else {
        drivers[driver || logDriver].log(
          `${ERROR_PREFIX} -`,
          ...args,
        );
      }
    } else {
      drivers[logDriver].log(`${ERROR_PREFIX} -`, ...args);
    }
  }
}

export default { info, debug, warn, error };
