import { colors } from "./deps.ts";

export const LOG_DRIVERS = ["console", "test"];

export const LOG_LEVELS = ["info", "debug", "warn", "error", "none"];

export const INFO_PREFIX = `[${colors.blue("info")}]`;
export const DEBUG_PREFIX = `[${colors.magenta("debug")}]`;
export const WARN_PREFIX = `[${colors.yellow("warn")}]`;
export const ERROR_PREFIX = `[${colors.red("error")}]`;
