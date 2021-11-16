import * as SQS from "https://esm.sh/@aws-sdk/client-sqs@3.41.0?pin=v57&no-check";
import env from "../env/mod.ts";

const AWS = { ...SQS };

export { AWS, env };
