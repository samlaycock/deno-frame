export interface LogDriver {
  log: (...args: Array<unknown>) => void;
}

export type LogDriverType = "console";

export interface LoggerOptions {
  namespace?: string | null;
  driver?: LogDriverType | LogDriver;
}
