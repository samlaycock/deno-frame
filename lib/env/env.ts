import { dotenv } from "./deps.ts";
import parsers from "./parsers.ts";
import internalCache from "./internal_cache.ts";
import type { EnvOptions, EnvValues } from "./types.d.ts";

await dotenv.configAsync({ export: true });

export async function load(
  values: EnvValues,
  options?: EnvOptions,
): Promise<void> {
  if (typeof options?.driver === "object") {
    await options.driver.load(values);
  }

  for (const [key, parser] of Object.entries(values)) {
    const formattedKey = key.toUpperCase();
    const rawValue = Deno.env.get(formattedKey);
    let parserFunc;
    let parserOptions;
    let parsedValue;

    if (typeof parser === "string") {
      if (typeof rawValue === "undefined") {
        parsedValue = rawValue;
      } else {
        parserFunc = `as${(parser).charAt(0).toUpperCase()}${
          (parser).slice(1)
        }`;
      }
    } else if (typeof parser === "object") {
      const {
        as: parserType,
        default: defaultValue,
        required,
        ...options
      } = parser;

      if (
        typeof rawValue === "undefined" && typeof defaultValue !== "undefined"
      ) {
        parsedValue = defaultValue;
      }

      if (
        required &&
        (typeof rawValue === "undefined" && typeof parsedValue === "undefined")
      ) {
        throw new Error(`"${key}" is a required value`);
      }

      parserFunc = `as${(parserType as string).charAt(0).toUpperCase()}${
        (parserType as string).slice(1)
      }`;
      parserOptions = { ...options };
    }

    if (
      typeof parsedValue === "undefined" &&
      typeof rawValue !== "undefined" &&
      parserFunc
    ) {
      try {
        // deno-lint-ignore ban-types
        parsedValue = (parsers as Record<string, Function>)
          [parserFunc as string](rawValue, parserOptions);
      } catch (error) {
        throw new Error(`"${key}" ${error.message}`);
      }
    }

    internalCache.set(formattedKey, parsedValue);
  }
}

export function get(key: string, defaultValue?: unknown): unknown {
  return internalCache.get(key.toUpperCase()) || defaultValue;
}

export function set(
  key: string,
  value: string | number | boolean | object,
): unknown {
  internalCache.set(key.toUpperCase(), value);

  return value;
}

export function unset(key: string): void {
  internalCache.delete(key.toUpperCase());
}

export default {
  load,
  get,
  set,
  unset,
};
