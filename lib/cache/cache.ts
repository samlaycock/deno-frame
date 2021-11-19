import drivers from "./drivers/map.ts";
import { getCacheDriver } from "./_util/util.ts";
import type { CacheOptions } from "./types.d.ts";

// deno-lint-ignore require-await
export async function get(
  key: string,
  options?: CacheOptions,
): Promise<string | null> {
  const cacheDriverType = getCacheDriver();
  const cacheDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options?.driver || cacheDriverType];

  return cacheDriver.get(key);
}

// deno-lint-ignore require-await
export async function set(
  key: string,
  value: string,
  options?: CacheOptions,
): Promise<void> {
  const cacheDriverType = getCacheDriver();
  const cacheDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options?.driver || cacheDriverType];

  return cacheDriver.set(key, value);
}

// deno-lint-ignore require-await
export async function unset(
  key: string,
  options?: CacheOptions,
): Promise<void> {
  const cacheDriverType = getCacheDriver();
  const cacheDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options?.driver || cacheDriverType];

  return cacheDriver.unset(key);
}

export default {
  get,
  set,
  unset,
};
