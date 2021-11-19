import { env } from "../deps.ts";
import { CACHE_DRIVERS } from "../constants.ts";
import type { CacheDriverType } from "../types.d.ts";

env.config({
  FRAME_CACHE_DRIVER: {
    as: "string",
    enum: CACHE_DRIVERS,
  },
  CACHE_DRIVER: {
    as: "string",
    enum: CACHE_DRIVERS,
  },
});

export function getCacheDriver(): CacheDriverType {
  const logDriver = env.get("FRAME_CACHE_DRIVER") ||
    env.get("CACHE_DRIVER") ||
    "memory";

  return logDriver as CacheDriverType;
}
