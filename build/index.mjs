import { DynamoDB }from "@aws-sdk/client-dynamodb";
import { Kinesis } from "@aws-sdk/client-kinesis";
import { S3 } from "@aws-sdk/client-s3";
import { SES } from "@aws-sdk/client-ses";
import { SNS } from "@aws-sdk/client-sns";
import { SQS } from "@aws-sdk/client-sqs";

const AWS = {
  DynamoDB,
  Kinesis,
  S3,
  SES,
  SNS,
  SQS
}

export default AWS;
