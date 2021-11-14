import log, { debug, error, info, warn } from "./logger.ts";
import { LOG_DRIVERS, LOG_LEVELS } from "./constants.ts";
import type { LogDriver, LogDriverType, LoggerOptions } from "./types.d.ts";

export default log;

export { debug, error, info, LOG_DRIVERS, LOG_LEVELS, warn };

export type { LogDriver, LogDriverType, LoggerOptions };
