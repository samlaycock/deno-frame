import consoleDriver from "./console.ts";
import type { LogDriver, LogDriverType } from "../types.d.ts";

export default {
  console: consoleDriver,
} as Record<LogDriverType, LogDriver>;
