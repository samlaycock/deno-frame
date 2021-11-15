import consoleDriver from "./console/driver.ts";
import testDriver from "./_test/driver.ts";
import type { LogDriver, LogDriverType } from "../types.d.ts";

export default {
  console: consoleDriver,
  test: testDriver,
} as Record<LogDriverType, LogDriver>;
