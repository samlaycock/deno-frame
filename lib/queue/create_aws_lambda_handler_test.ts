import { asserts, mock } from "./dev_deps.ts";
import createAWSLambdaHandler from "./create_aws_lambda_handler.ts";

Deno.test("createAWSLambdaHandler() should call 'options.onQueueJob' for each given 'Record' value", async () => {
  const onQueueJob = mock.spy();
  const handler = createAWSLambdaHandler({ onQueueJob });
  const data = {
    Records: [
      {
        messageId: "test_1",
        receiptHandle: "test_1",
        body: "test_1",
        attributes: {
          ApproximateReceiveCount: "test_1",
          SentTimestamp: "test_1",
          SenderId: "test_1",
          ApproximateFirstReceiveTimestamp: "test_1",
        },
        messageAttributes: {},
        md5OfBody: "test_1",
        eventSource: "test_1",
        eventSourceARN: "test_1",
        awsRegion: "test_1",
      },
      {
        messageId: "test_2",
        receiptHandle: "test_2",
        body: "test_2",
        attributes: {
          ApproximateReceiveCount: "test_2",
          SentTimestamp: "test_2",
          SenderId: "test_2",
          ApproximateFirstReceiveTimestamp: "test_2",
        },
        messageAttributes: {},
        md5OfBody: "test_2",
        eventSource: "test_2",
        eventSourceARN: "test_2",
        awsRegion: "test_2",
      },
    ],
  };

  await handler(data);

  asserts.assertEquals(
    onQueueJob.calls?.[0]?.args[0],
    {
      id: data.Records[0].messageId,
      body: data.Records[0].body,
      metadata: data.Records[0].messageAttributes,
    },
  );
  asserts.assertEquals(
    onQueueJob.calls?.[1]?.args[0],
    {
      id: data.Records[1].messageId,
      body: data.Records[1].body,
      metadata: data.Records[1].messageAttributes,
    },
  );
});

Deno.test("createAWSLambdaHandler() should call 'options.onQueueJob' with the given 'context' value", async () => {
  const onQueueJob = mock.spy();
  const context = {};
  const handler = createAWSLambdaHandler({ onQueueJob, context });
  const data = {
    Records: [
      {
        messageId: "test_1",
        receiptHandle: "test_1",
        body: "test_1",
        attributes: {
          ApproximateReceiveCount: "test_1",
          SentTimestamp: "test_1",
          SenderId: "test_1",
          ApproximateFirstReceiveTimestamp: "test_1",
        },
        messageAttributes: {},
        md5OfBody: "test_1",
        eventSource: "test_1",
        eventSourceARN: "test_1",
        awsRegion: "test_1",
      },
    ],
  };

  await handler(data);

  asserts.assertEquals(onQueueJob.calls?.[0]?.args[1], context);
});

Deno.test("createAWSLambdaHandler() should call 'options.onQueueJob' with the return value of the given 'context' value", async () => {
  const onQueueJob = mock.spy();
  const contextData = {};
  const context = mock.spy(() => contextData);
  const handler = createAWSLambdaHandler({ onQueueJob, context });
  const data = {
    Records: [
      {
        messageId: "test_1",
        receiptHandle: "test_1",
        body: "test_1",
        attributes: {
          ApproximateReceiveCount: "test_1",
          SentTimestamp: "test_1",
          SenderId: "test_1",
          ApproximateFirstReceiveTimestamp: "test_1",
        },
        messageAttributes: {},
        md5OfBody: "test_1",
        eventSource: "test_1",
        eventSourceARN: "test_1",
        awsRegion: "test_1",
      },
    ],
  };

  await handler(data);

  asserts.assertEquals(onQueueJob.calls?.[0]?.args[1], contextData);
});

Deno.test("createAWSLambdaHandler() should call 'options.onSuccess' when 'options.onQueueJob' is called successfully", async () => {
  const onQueueJob = () => {};
  const onSuccess = mock.spy();
  const context = {};
  const handler = createAWSLambdaHandler({ onQueueJob, onSuccess, context });
  const data = {
    Records: [
      {
        messageId: "test_1",
        receiptHandle: "test_1",
        body: '{"test_1": true}',
        attributes: {
          ApproximateReceiveCount: "test_1",
          SentTimestamp: "test_1",
          SenderId: "test_1",
          ApproximateFirstReceiveTimestamp: "test_1",
        },
        messageAttributes: {},
        md5OfBody: "test_1",
        eventSource: "test_1",
        eventSourceARN: "test_1",
        awsRegion: "test_1",
      },
    ],
  };

  await handler(data);

  asserts.assertEquals(
    onSuccess.calls?.[0]?.args[0],
    {
      id: data.Records[0].messageId,
      body: JSON.parse(data.Records[0].body),
      metadata: data.Records[0].messageAttributes,
    },
  );
  asserts.assertEquals(onSuccess.calls?.[0]?.args[1], context);
});

Deno.test("createAWSLambdaHandler() should call 'options.onError' when 'options.onQueueJob' is called successfully", async () => {
  const error = new Error();
  const onQueueJob = () => {
    throw error;
  };
  const context = {};
  const onError = mock.spy();
  const handler = createAWSLambdaHandler({ onQueueJob, onError, context });
  const data = {
    Records: [
      {
        messageId: "test_1",
        receiptHandle: "test_1",
        body: '{"test_1": true}',
        attributes: {
          ApproximateReceiveCount: "test_1",
          SentTimestamp: "test_1",
          SenderId: "test_1",
          ApproximateFirstReceiveTimestamp: "test_1",
        },
        messageAttributes: {},
        md5OfBody: "test_1",
        eventSource: "test_1",
        eventSourceARN: "test_1",
        awsRegion: "test_1",
      },
    ],
  };

  await handler(data);

  asserts.assertEquals(onError.calls?.[0]?.args[0], error);
  asserts.assertEquals(
    onError.calls?.[0]?.args[1],
    {
      id: data.Records[0].messageId,
      body: JSON.parse(data.Records[0].body),
      metadata: data.Records[0].messageAttributes,
    },
  );
  asserts.assertEquals(onError.calls?.[0]?.args[2], context);
});

Deno.test("createAWSLambdaHandler() should parse the 'Record.body' value as JSON", async () => {
  const onQueueJob = mock.spy();
  const handler = createAWSLambdaHandler({ onQueueJob });
  const data = {
    Records: [
      {
        messageId: "test_1",
        receiptHandle: "test_1",
        body: '{"test_1": true}',
        attributes: {
          ApproximateReceiveCount: "test_1",
          SentTimestamp: "test_1",
          SenderId: "test_1",
          ApproximateFirstReceiveTimestamp: "test_1",
        },
        messageAttributes: {},
        md5OfBody: "test_1",
        eventSource: "test_1",
        eventSourceARN: "test_1",
        awsRegion: "test_1",
      },
    ],
  };

  await handler(data);

  asserts.assertEquals(
    onQueueJob.calls?.[0]?.args[0],
    {
      id: data.Records[0].messageId,
      body: JSON.parse(data.Records[0].body),
      metadata: data.Records[0].messageAttributes,
    },
  );
});
