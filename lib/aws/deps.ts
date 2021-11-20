// import * as SQS from "https://esm.sh/@aws-sdk/client-sqs@3.41.0?pin=v57&no-check";

// const AWS = { ...SQS };

// export { AWS };

import clients from "./_build/aws.mjs";
import type { S3ClientConstructor, SQSClientConstructor } from "./types.d.ts";

const AWS = ((clients as unknown) as {
  S3: S3ClientConstructor;
  SQS: SQSClientConstructor;
  config: { logger?: any };
});

export { AWS };
