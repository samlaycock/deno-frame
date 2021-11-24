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
  } catch (_) {}
}

async function readFile(bucket: string, file: string): Promise<ReadableStream> {
  try {
    await ensureDir(bucket);

    const dir = getDir();
    const filePath = `${dir}/${bucket}/${file}`;
    const fileReader = await Deno.open(filePath, { read: true });
    const fileStream = streams.readableStreamFromReader(fileReader);

    return fileStream;
  } catch (error) {
    throw error;
  }
}

async function writeFile(
  bucket: string,
  file: string,
  data: Uint8Array | ReadableStream<Uint8Array>,
  options?: WriteFileOptions,
): Promise<void> {
  try {
    await ensureDir(bucket);

    const dir = getDir();
    const filePath = `${dir}/${bucket}/${file}`;

    try {
      await Deno.create(filePath);
    } catch (_) {}

    const fileReader = await Deno.open(filePath, { write: true });
    let fileData = data;

    if (fileData instanceof ReadableStream) {
      const fileDataReader = await streams.readerFromIterable(fileData);

      fileData = await streams.readAll(fileDataReader);
    }

    await Deno.writeAll(fileReader, fileData as Uint8Array);
  } catch (error) {
    throw error;
  }
}

async function deleteFile(bucket: string, file: string): Promise<void> {
  try {
    await ensureDir(bucket);

    const dir = getDir();
    const filePath = `${dir}/${bucket}/${file}`;

    await Deno.remove(filePath);
  } catch (error) {
    throw error;
  }
}

export default {
  name: "file",
  readFile,
  writeFile,
  deleteFile,
};
