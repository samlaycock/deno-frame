import drivers from "./drivers/map.ts";
import { getFileDriver } from "./_util/util.ts";
import type { FileOptions, WriteFileOptions } from "./types.d.ts";

export function readFile(
  bucket: string,
  file: string,
  options?: FileOptions,
): Promise<ReadableStream> {
  const fileDriverType = getFileDriver();
  const fileDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options?.driver || fileDriverType];

  return fileDriver.readFile(bucket, file);
}

export async function writeFile(
  bucket: string,
  file: string,
  data: Uint8Array | ReadableStream<Uint8Array>,
  writeFileOptions?: WriteFileOptions,
  options?: FileOptions,
): Promise<void> {
  const fileDriverType = getFileDriver();
  const fileDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options?.driver || fileDriverType];

  return fileDriver.writeFile(bucket, file, data, writeFileOptions);
}

export function deleteFile(
  bucket: string,
  file: string,
  options?: FileOptions,
): Promise<void> {
  const fileDriverType = getFileDriver();
  const fileDriver = typeof options?.driver === "object"
    ? options.driver
    : drivers[options?.driver || fileDriverType];

  return fileDriver.deleteFile(bucket, file);
}

export default {
  readFile,
  writeFile,
  deleteFile,
};
