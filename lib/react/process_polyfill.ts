const NODE_ENV = "production";

const process = {
  env: {
    NODE_ENV,
  },
};

(globalThis as Record<string, unknown>).process = process;
