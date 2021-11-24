# Frame AWS Module <!-- omit in toc -->

The `Frame AWS Module` exports pinned versions of
[AWS SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
clients (and other providers for AWS services where necessary), provided via a
custom build of
[AWS SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html).

## Contents

- [Contents](#contents)
- [Usage](#usage)
- [Supported clients](#supported-clients)
  - [SQS](#sqs)

## Usage

To use a module from this package, you can import as follows:

```javascript
import AWS from "https://deno.land/x/frame/aws/mod.ts";

// or
import { AWS } from "https://deno.land/x/frame/aws/mod.ts";

// or
import { S3 } from "https://deno.land/x/frame/aws/mod.ts";

// or
import S3 from "https://deno.land/x/frame/aws/s3.ts";

// or
import { S3 } from "https://deno.land/x/frame/aws/s3.ts";
```

You can then use a ([supported](#supported-clients)) client from the imported
module, e.g.:

```javascript
import AWS from "https://deno.land/x/frame/aws/mod.ts";

const s3Client = new AWS.S3();

// or
import S3 from "https://deno.land/x/frame/aws/s3.ts";

const s3Client = new S3();
```

## Supported clients

### SQS

You can use the
[AWS SQS](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/index.html)
client as follows:

```javascript
import SQS from "https://deno.land/x/frame/aws/sqs.ts";

const sqsClient = new SQS();
```
