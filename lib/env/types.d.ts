export interface EnvDriver {
  load: (values: EnvValues) => void | Promise<void>;
}

export type EnvParser =
  | "array"
  | "boolean"
  | "float"
  | "int"
  | "json"
  | "regExp"
  | "string"
  | "url";

export interface EnvParserOptions {
  as: EnvParser;
  default?: unknown;
  required?: boolean;
  enum?: Array<string>;
  delimiter?: string;
  of?: EnvParser;
  strict?: boolean;
  min?: number;
  max?: number;
  positive?: boolean;
  negative?: boolean;
  port?: boolean;
  object?: boolean;
  array?: boolean;
  flags?: string;
}

export type EnvValues = Record<string, EnvParser | EnvParserOptions>;

export interface EnvOptions {
  driver?: EnvDriver;
}
