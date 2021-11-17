import type { EnvParser } from "./types.d.ts";

export function asString(
  value: string,
  options?: { enum?: Array<string> },
) {
  if (options?.enum && options.enum.indexOf(value) < 0) {
    throw new Error(`should be one of ${options.enum.join(", ")}`);
  }

  return value;
}

export function asArray(
  value: string,
  options?: { delimiter?: string; of?: EnvParser },
): Array<string> {
  const vals = value.split(options?.delimiter || ",").filter((item) =>
    Boolean(item)
  );

  if (options?.of) {
    return vals.map((value) =>
      // deno-lint-ignore ban-types
      (parsers as { [key: string]: Function })
        [
          `as${(options.of as string).charAt(0).toUpperCase()}${
            (options.of as string).slice(1)
          }`
        ](
          value,
        )
    );
  }

  return vals;
}

export function asBoolean(
  value: string,
  options: { strict?: boolean } = {},
): boolean {
  const val = value.toLowerCase();
  const allowedValues = options?.strict
    ? ["true", "false"]
    : ["false", "0", "true", "1"];

  if (allowedValues.indexOf(val) === -1) {
    if (options?.strict) {
      throw new Error('should be either "true", "false", "TRUE", or "FALSE"');
    }

    throw new Error(
      'should be either "true", "false", "TRUE", "FALSE", 1, or 0',
    );
  }

  return !((val === "0") || (val === "false"));
}

export function asFloat(
  value: string,
  options?: { positive?: boolean; negative?: boolean },
): number {
  const val = parseFloat(value);

  if (isNaN(val) || val.toString() !== value) {
    throw new Error("should be a valid float");
  }

  if (options?.positive && val < 0) {
    throw new Error("should be a positive float");
  } else if (options?.negative && val > 0) {
    throw new Error("should be a negative float");
  }

  return val;
}

export function asInt(
  value: string,
  options?: { positive?: boolean; negative?: boolean; port?: boolean },
): number {
  const val = parseInt(value, 10);

  if (isNaN(val) || val.toString(10) !== value) {
    throw new Error("should be a valid integer");
  }

  if (options?.positive && val < 0) {
    throw new Error("should be a positive integer");
  } else if (options?.negative && val > 0) {
    throw new Error("should be a negative integer");
  } else if (options?.port && (val <= 0 || val > 65535)) {
    throw new Error("should a port number no greater than 65535");
  }

  return val;
}

export function asJson(
  value: string,
  options?: { object?: boolean; array?: boolean },
): Record<string, unknown> | string | number | boolean {
  let val;

  try {
    val = JSON.parse(value);
  } catch (_) {
    throw new Error("should be valid (parseable) JSON");
  }

  if (options?.array && !Array.isArray(val)) {
    throw new Error("should be a parseable JSON Array");
  } else if (
    options?.object && (typeof val !== "object" || Array.isArray(val))
  ) {
    throw new Error("should be a parseable JSON Object");
  }

  return val;
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
    throw new Error("has invalid RegExp flags");
  }

  try {
    return new RegExp(value, flags);
  } catch (_) {
    // We know that the RegExp is the issue because we tested the flags earlier
    throw new Error("should be a valid RegExp");
  }
}

export function asUrl(value: string): URL {
  try {
    return new URL(value);
  } catch (_) {
    throw new Error("should be a valid URL");
  }
}

const parsers = {
  asArray,
  asBoolean,
  asString,
  asFloat,
  asInt,
  asJson,
  asRegExp,
  asUrl,
};

export default parsers;
