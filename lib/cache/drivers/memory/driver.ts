const memoryCache = new Map();

function get(key: string): string | null {
  return memoryCache.get(key) as string || null;
}

function set(key: string, value: string): void {
  memoryCache.set(key, value);
}

function unset(key: string): void {
  memoryCache.delete(key);
}

export default {
  name: "memory",
  get,
  set,
  unset,
};
