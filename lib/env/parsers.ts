export function asString(value: string) {
  return value;
}

export function asArray(
  value: string,
  options: { delimiter?: string } = {},
): Array<string> {
  const { delimiter = "," } = options;

  if (!value.length) {
    return [];
  } else {
    return asString(value).split(delimiter).filter((item) => Boolean(item));
  }
}

export function asBool(value: string): boolean {
  const val = value.toLowerCase();
  const allowedValues = [
    "false",
    "0",
    "true",
    "1",
  ];

  if (allowedValues.indexOf(val) === -1) {
    throw new Error(
      'should be either "true", "false", "TRUE", "FALSE", 1, or 0',
    );
  }

  return !((val === "0") || (val === "false"));
}

export function asBoolStrict(value: string): boolean {
  const val = value.toLowerCase();

  if ((val !== "false") && (val !== "true")) {
    throw new Error('should be either "true", "false", "TRUE", or "FALSE"');
  }

  return val !== "false";
}

export function asEnum(
  value: string,
  options: { valid: Array<string> },
): string {
  const { valid } = options;
  const valueString = asString(value);

  if (valid.indexOf(valueString) < 0) {
    throw new Error(`should be one of ${valid.join(", ")}`);
  }

  return valueString;
}

export function asFloat(value: string): number {
  const n = parseFloat(value);

  if (isNaN(n) || n.toString() !== value) {
    throw new Error("should be a valid float");
  }

  return n;
}

export function asFloatNegative(value: string): number {
  const ret = asFloat(value);

  if (ret > 0) {
    throw new Error("should be a negative float");
  }

  return ret;
}

export function asFloatPositive(value: string): number {
  const ret = asFloat(value);

  if (ret < 0) {
    throw new Error("should be a positive float");
  }

  return ret;
}

export function asInt(value: string): number {
  const ret = parseInt(value, 10);

  if (isNaN(ret) || ret.toString(10) !== value) {
    throw new Error("should be a valid integer");
  }

  return ret;
}

export function asIntNegative(value: string): number {
  const ret = asInt(value);

  if (ret > 0) {
    throw new Error("should be a negative integer");
  }

  return ret;
}

export function asIntPositive(value: string): number {
  const ret = asInt(value);

  if (ret < 0) {
    throw new Error("should be a positive integer");
  }

  return ret;
}

export function asJson(
  value: string,
): Record<string, unknown> | string | number | boolean {
  try {
    return JSON.parse(value);
  } catch (_) {
    throw new Error("should be valid (parseable) JSON");
  }
}

export function asJsonArray(value: string): Array<unknown> {
  const ret = asJson(value);

  if (!Array.isArray(ret)) {
    throw new Error("should be a parseable JSON Array");
  }

  return ret;
}

export function asJsonObject(value: string): Record<string, unknown> {
  const ret = asJson(value);

  if (typeof ret !== "object" || Array.isArray(ret)) {
    throw new Error("should be a parseable JSON Object");
  }

  return ret;
}

export function asPortNumber(value: string): number {
  const ret = asIntPositive(value);

  if (ret > 65535) {
    throw new Error("cannot assign a port number greater than 65535");
  }

  return ret;
}

export function asRegExp(
  value: string,
  options: { flags?: string } = {},
): RegExp {
  const { flags } = options;
  // We have to test the value and flags individually if we want to write our
  // own error messages,as there is no way to differentiate between the two
  // errors except by using string comparisons.

  // Test the flags
  try {
    RegExp("", flags);
  } catch (_) {
    throw new Error("invalid RegExp flags");
  }

  try {
    return new RegExp(value, flags);
  } catch (_) {
    // We know that the RegExp is the issue because we tested the flags earlier
    throw new Error("should be a valid RegExp");
  }
}

export function asUrlObject(value: string): URL {
  const ret = asString(value);

  try {
    return new URL(ret);
  } catch (_) {
    throw new Error("should be a valid URL");
  }
}

export function asUrlString(value: string): string {
  return asUrlObject(value).toString().replace(/\/$/, "");
}
