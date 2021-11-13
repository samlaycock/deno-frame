export type EnvParser =
  | "array"
  | "bool"
  | "boolStrict"
  | "enum"
  | "float"
  | "floatNegative"
  | "floatPositive"
  | "int"
  | "intNegative"
  | "intPositive"
  | "json"
  | "jsonArray"
  | "jsonObject"
  | "portNumber"
  | "regExp"
  | "string"
  | "urlObject"
  | "urlString";

export interface EnvParserOptions {
  as: EnvParser;
  valid?: Array<string>;
  delimiter?: string;
  flags?: string;
  required?: boolean;
}

export type EnvValues = Record<string, EnvParser | EnvParserOptions>;
