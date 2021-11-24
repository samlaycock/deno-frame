import S3 from "./s3.ts";
import SQS from "./sqs.ts";

const AWS = {
  S3,
  SQS,
};

export default AWS;
export { S3, SQS };
