import * as SQS from "https://cdn.skypack.dev/@aws-sdk/client-sqs@v3.41.0";
import env from "../env/mod.ts";

const AWS = { ...SQS };

export { AWS, env };
