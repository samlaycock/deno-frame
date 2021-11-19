export interface CacheDriver {
  get: (key: string) => string | null | Promise<string | null>;
  set: (key: string, value: string) => void | Promise<void>;
  unset: (key: string) => void | Promise<void>;
}

export type CacheDriverType = "memory" | "redis" | "test";

export interface CacheOptions {
  driver?: CacheDriverType | CacheDriver;
}
