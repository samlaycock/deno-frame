# Frame AWS Module <!-- omit in toc -->

The `Frame AWS Module` exports pinned versions of [AWS SDK]() clients (and other
providers for AWS services where necessary), provided by
[esm.sh](https://esm.sh) and [Skypack CDN](https://skypack.dev).

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
```

You can then use a ([supported](#supported-clients)) client from the imported
module, e.g.:

```javascript
import AWS from "https://deno.land/x/frame/aws/mod.ts";

const sqsClient = new AWS.SQS();
```

## Supported clients

### SQS

You can use the
[AWS SQS](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/index.html)
client as follows:

```javascript
import AWS from "https://deno.land/x/frame/aws/mod.ts";

const sqsClient = new AWS.SQS();
```
