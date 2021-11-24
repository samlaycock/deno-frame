import * as streams from "https://deno.land/std@0.115.1/streams/conversion.ts";
import env from "../env/mod.ts";
import S3, { S3ClientConstructor } from "../aws/s3.ts";

const AWS = { S3: S3 as S3ClientConstructor };

export { AWS, env, streams };
