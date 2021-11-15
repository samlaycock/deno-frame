export interface LogDriver {
  name: string;
  log: (...args: Array<unknown>) => void;
}

export type LogDriverType = "console" | "test";

export type LogLevel = "info" | "debug" | "warn" | "error" | "none";

export interface LoggerOptions {
  namespace?: string | null;
  driver?: LogDriverType | LogDriver;
}
