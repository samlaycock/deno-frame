import { env, redis } from "../../deps.ts";

env.config({
  REDIS_URL: "url",
});

let connection: Promise<redis.Redis> | null = null;

async function connect(): Promise<redis.Redis> {
  if (connection === null) {
    const redisUrl = env.get("REDIS_URL") as URL;

    connection = redis.connect({
      hostname: redisUrl.hostname,
      port: redisUrl.port || undefined,
    });
  }

  const redisConnection = await connection;

  return redisConnection;
}

async function get(key: string): Promise<string | null> {
  const redisConnection = await connect();
  const value = await redisConnection.get(key) as string | undefined;

  return value || null;
}

async function set(key: string, value: string): Promise<void> {
  const redisConnection = await connect();

  await redisConnection.set(key, value);
}

async function unset(key: string): Promise<void> {
  const redisConnection = await connect();

  await redisConnection.del(key);
}

export default {
  get,
  set,
  unset,
};
