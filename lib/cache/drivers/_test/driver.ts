import { mock } from "../../dev_deps.ts";

const memoryCache = new Map();

const get = mock.spy((key) => memoryCache.get(key) || null);
const set = mock.spy((key, value) => {
  memoryCache.set(key, value);
});
const unset = mock.spy((key) => {
  memoryCache.delete(key);
});

export default {
  get,
  set,
  unset,
  reset() {
    this.get = mock.spy((key) => memoryCache.get(key) || null);
    this.set = mock.spy((key, value) => {
      memoryCache.set(key, value);
    });
    this.unset = mock.spy((key) => {
      memoryCache.delete(key);
    });

    for (const key of memoryCache.keys()) {
      memoryCache.delete(key);
    }
  },
};
