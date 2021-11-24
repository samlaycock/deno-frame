export interface FileDriver {
  readFile(bucket: string, file: string): Promise<ReadableStream>;
  writeFile(
    bucket: string,
    file: string,
    data: Uint8Array | ReadableStream<Uint8Array>,
    options?: WriteFileOptions,
  ): Promise<void>;
  deleteFile(bucket: string, file: string): Promise<void>;
}

export type FileDriverType = "file" | "s3" | "test";

export interface FileOptions {
  driver?: FileDriverType | FileDriver;
}

export interface WriteFileOptions {
  contentLength?: number;
}
