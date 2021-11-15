export interface LogDriver {
  name: LogDriverType;
  log: (...args: Array<unknown>) => void;
}

export type LogDriverType = "console" | "test";

export interface LoggerOptions {
  namespace?: string | null;
  driver?: LogDriverType;
}
