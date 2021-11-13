import { dotenv } from "./deps.ts";
import * as parsers from "./parsers.ts";
import internalCache from "./internal_cache.ts";
import { ENV_PARSERS } from "./constants.ts";
import type { EnvParser, EnvParserOptions, EnvValues } from "./types.d.ts";

await dotenv.configAsync({ export: true });

function config(values: EnvValues): void {
  if (typeof values !== "object" || Array.isArray(values)) {
    throw new Error("'values' must be an object");
  }

  for (const [key, parser] of Object.entries(values)) {
    const formattedKey = key.toUpperCase();
    const rawValue = Deno.env.get(formattedKey);

    if (typeof rawValue !== "undefined") {
      let parsedValue;

      if (typeof parser === "string") {
        if (!ENV_PARSERS.includes(parser as string)) {
          throw new Error(
            `Invalid 'parser' "${parser}" for "${key}" (must be one of ${
              ENV_PARSERS.join(", ")
            })`,
          );
        }

        const parserFunc = `as${(parser as string).charAt(0).toUpperCase()}${
          (parser as string).slice(1)
        }`;

        // deno-lint-ignore ban-types
        parsedValue = (parsers as Record<string, Function>)
          [parserFunc as string](rawValue);
      } else if (typeof parser === "object" && !Array.isArray(parser)) {
        const { as: parserType, required, ...options } = parser;

        if (!ENV_PARSERS.includes(parserType as string)) {
          throw new Error(
            `Invalid 'parser.as' "${parserType}" for "${key}" (must be one of ${
              ENV_PARSERS.join(", ")
            })`,
          );
        }

        if (
          required && (typeof parsedValue === "undefined")
        ) {
          throw new Error(`"${key}" is a required value`);
        }

        const parserFunc = `as${
          (parserType as string).charAt(0).toUpperCase()
        }${(parserType as string).slice(1)}`;

        // deno-lint-ignore ban-types
        parsedValue = (parsers as Record<string, Function>)
          [parserFunc as string](rawValue, { ...options });
      } else {
        throw new Error(`'parser' for "${key}" must be a string or an array`);
      }

      internalCache.set(formattedKey, parsedValue);
    }
  }
}

function get(
  key: string,
  defaultValue?: unknown,
  options?: { parse: EnvParser | EnvParserOptions },
): unknown {
  if (typeof key !== "string") {
    throw new Error("'key' must be a string");
  }

  const value = internalCache.get(key.toUpperCase()) || defaultValue;

  if (typeof value === "undefined" && options?.parse) {
    if (typeof options.parse === "string") {
      if (!ENV_PARSERS.includes(options.parse as string)) {
        throw new Error(
          `Invalid 'parser' "${options.parse}" for "${key}" (must be one of ${
            ENV_PARSERS.join(", ")
          })`,
        );
      }

      const parserFunc = `as${
        (options.parse as string).charAt(0).toUpperCase()
      }${(options.parse as string).slice(1)}`;

      // deno-lint-ignore ban-types
      return (parsers as Record<string, Function>)[parserFunc as string](
        value,
      );
    }

    const { as: parserType, required, ...parserOptions } = options.parse;

    if (!ENV_PARSERS.includes(parserType as string)) {
      throw new Error(
        `Invalid 'parser.as' "${parserType}" for "${key}" (must be one of ${
          ENV_PARSERS.join(", ")
        })`,
      );
    }

    if (
      required && (typeof value === "undefined")
    ) {
      throw new Error(`"${key}" is a required value`);
    }

    const parserFunc = `as${(parserType as string).charAt(0).toUpperCase()}${
      (parserType as string).slice(1)
    }`;

    // deno-lint-ignore ban-types
    return (parsers as Record<string, Function>)[parserFunc as string](
      value,
      { ...parserOptions },
    );
  }

  return value;
}

function set(key: string, value: unknown): unknown {
  if (typeof key !== "string") {
    throw new Error("'key' must be a string");
  }

  if (
    (
      typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean" &&
      typeof value !== "object"
    ) ||
    value === null
  ) {
    throw new Error(
      "'value' must be string, number, boolean, object, Array, RegExp or URL",
    );
  }

  internalCache.set(key.toUpperCase(), value);

  return value;
}

function unset(key: string): void {
  if (typeof key !== "string") {
    throw new Error("'key' must be a string");
  }

  internalCache.delete(key.toUpperCase());
}

export default {
  config,
  get,
  set,
  unset,
};
