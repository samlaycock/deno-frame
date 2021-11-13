import * as log from "./logger.ts";
import { LOG_DRIVERS, LOG_LEVELS } from "./constants.ts";
import type { LogDriver, LogDriverType, LoggerOptions } from "./types.d.ts";

export default log;

export { LOG_DRIVERS, LOG_LEVELS };

export type { LogDriver, LogDriverType, LoggerOptions };
