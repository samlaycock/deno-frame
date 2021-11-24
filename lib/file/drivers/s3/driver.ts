import { AWS, env } from "../../deps.ts";
import type { WriteFileOptions } from "../../types.d.ts";

await env.load({
  /* Region */
  S3_AWS_DEFAULT_REGION: "string",
  AWS_DEFAULT_REGION: "string",
  S3_AWS_REGION: "string",
  AWS_REGION: { as: "string", default: "local" },
  /* Access Key ID */
  S3_AWS_ACCESS_KEY_ID: "string",
  AWS_ACCESS_KEY_ID: "string",
  /* Secret Access Key */
  S3_AWS_SECRET_ACCESS_KEY: "string",
  AWS_SECRET_ACCESS_KEY: "string",
  /* S3 */
  S3_URL: "url",
});

function createS3Client() {
  const endpoint = env.get("S3_URL") as URL | undefined;
  const region = (env.get("S3_AWS_DEFAULT_REGION") ||
    env.get("AWS_DEFAULT_REGION") ||
    env.get("S3_AWS_REGION") ||
    env.get("AWS_REGION")) as string | undefined;
  const accessKeyId = (env.get("S3_AWS_ACCESS_KEY_ID") ||
    env.get("AWS_ACCESS_KEY_ID")) as string | undefined;
  const secretAccessKey = (env.get("S3_AWS_SECRET_ACCESS_KEY") ||
    env.get("AWS_SECRET_ACCESS_KEY")) as string | undefined;
  const clientOptions = {
    endpoint: endpoint ? (endpoint as URL).toString() : undefined,
    region: region as string | undefined,
    credentials: undefined as undefined | {
      accessKeyId: string;
      secretAccessKey: string;
    },
    forcePathStyle: true,
  };

  if (typeof accessKeyId !== "undefined") {
    clientOptions.credentials = {
      accessKeyId: accessKeyId as string,
      secretAccessKey: secretAccessKey as string,
    };
  }

  const client = new AWS.S3(clientOptions);

  return client;
}

async function ensureBucket(bucket: string): Promise<void> {
  const client = createS3Client();

  try {
    await client.createBucket({ Bucket: bucket });
  } catch (error) {
    if (error.name !== "BucketAlreadyOwnedByYou") {
      throw error;
    }
  }
}

async function readFile(bucket: string, file: string): Promise<ReadableStream> {
  const client = createS3Client();

  await ensureBucket(bucket);

  const { Body: data } = await client.getObject({ Bucket: bucket, Key: file });

  return data as ReadableStream;
}

async function writeFile(
  bucket: string,
  file: string,
  data: Uint8Array | ReadableStream<Uint8Array>,
  options?: WriteFileOptions,
): Promise<void> {
  const client = createS3Client();

  await ensureBucket(bucket);
  await client.putObject({
    Bucket: bucket,
    Key: file,
    Body: data,
    ContentLength: options?.contentLength,
  });
}

async function deleteFile(bucket: string, file: string): Promise<void> {
  const client = createS3Client();

  await ensureBucket(bucket);

  try {
    await client.deleteObject({ Bucket: bucket, Key: file });
  } catch (_) {}
}

export default {
  name: "s3",
  readFile,
  writeFile,
  deleteFile,
};
