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
  positive?: boolean;
  negative?: boolean;
  port?: boolean;
  object?: boolean;
  array?: boolean;
  flags?: string;
}

export type EnvValues = Record<string, EnvParser | EnvParserOptions>;
