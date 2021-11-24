import S3 from "./_build/s3.js";

const S3ClientConstructor = S3 as S3ClientConstructor;

export default S3ClientConstructor;
export { S3ClientConstructor as S3 };

export interface S3ClientOptions {
  endpoint?: string;
  region?: string;
  credentials?: {
    accessKeyId?: string;
    secretAccessKey?: string;
  };
  forcePathStyle?: boolean;
}

export interface S3HTTPOptions {
  abortSignal: AbortSignal;
}

export interface S3ClientConstructor {
  new (options?: S3ClientOptions): S3Client;
}

export interface S3Client {
  createBucket: (options: { Bucket: string }) => Promise<void>;
  getObject: (options: { Bucket: string; Key: string }) => Promise<S3Object>;
  putObject: (
    options: {
      Bucket: string;
      Key: string;
      Body: Uint8Array | ReadableStream<Uint8Array>;
      ContentLength?: number;
    },
  ) => Promise<void>;
  deleteObject: (options: { Bucket: string; Key: string }) => Promise<void>;
}

export interface S3Object {
  Body: ReadableStream;
}
