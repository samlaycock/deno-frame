import clients from "./_build/aws.mjs";
import type { S3ClientConstructor, SQSClientConstructor } from "./types.d.ts";

const AWS = ((clients as unknown) as {
  S3: S3ClientConstructor;
  SQS: SQSClientConstructor;
});

export { AWS };
