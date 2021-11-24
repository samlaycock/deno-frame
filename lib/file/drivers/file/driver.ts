import { env, streams } from "../../deps.ts";
import type { WriteFileOptions } from "../../types.d.ts";

await env.load({
  FRAME_FILE_DIR: "string",
  FILE_DIR: "string",
});

function getDir(): string {
  const dir = env.get("FRAME_FILE_DIR") || env.get("FILE_DIR") || "tmp";

  return dir as string;
}

async function ensureDir(bucket: string): Promise<void> {
  try {
    const dir = getDir();

    await Deno.mkdir(`${dir}/${bucket}`);
    // deno-lint-ignore no-empty
  } catch (_) {}
}

async function readFile(bucket: string, file: string): Promise<ReadableStream> {
  await ensureDir(bucket);

  const dir = getDir();
  const filePath = `${dir}/${bucket}/${file}`;
  const fileReader = await Deno.open(filePath, { read: true });
  const fileStream = streams.readableStreamFromReader(fileReader);

  return fileStream;
}

async function writeFile(
  bucket: string,
  file: string,
  data: Uint8Array | ReadableStream<Uint8Array>,
): Promise<void> {
  await ensureDir(bucket);

  const dir = getDir();
  const filePath = `${dir}/${bucket}/${file}`;

  try {
    await Deno.create(filePath);
    // deno-lint-ignore no-empty
  } catch (_) {}

  const fileReader = await Deno.open(filePath, { write: true });
  let fileData = data;

  if (fileData instanceof ReadableStream) {
    const fileDataReader = await streams.readerFromIterable(fileData);

    fileData = await streams.readAll(fileDataReader);
  }

  await streams.writeAll(fileReader, fileData as Uint8Array);
}

async function deleteFile(bucket: string, file: string): Promise<void> {
  await ensureDir(bucket);

  const dir = getDir();
  const filePath = `${dir}/${bucket}/${file}`;

  await Deno.remove(filePath);
}

export default {
  name: "file",
  readFile,
  writeFile,
  deleteFile,
};
