import { asserts, streams } from "../dev_deps.ts";
import env from "../../../lib/env/mod.ts";
import file from "../../../lib/file/mod.ts";

Deno.test({
  name: "S3 queue driver should save file data to S3",
  fn: async () => {
    env.set("FRAME_FILE_DRIVER", "s3");
    env.set("AWS_DEFAULT_REGION", "test");
    env.set("AWS_ACCESS_KEY_ID", "access_key_id");
    env.set("AWS_SECRET_ACCESS_KEY", "secret_access_key");
    env.set("S3_URL", new URL("http://localhost:4566"));

    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();

    const fileContents = "START\n\nThis is a test file.\n\nEND";
    const fileBuffer = textEncoder.encode(fileContents);
    const fileReader = await streams.readerFromIterable([fileBuffer]);
    const fileStream = await streams.readableStreamFromReader(fileReader);

    await file.writeFile("test", "test.txt", fileStream);

    const result = await file.readFile("test", "test.txt");
    const resultReader = await streams.readerFromIterable(result);
    const resultBuffer = await streams.readAll(resultReader);
    const resultContents = textDecoder.decode(resultBuffer);

    asserts.assertEquals(fileContents, resultContents);

    await file.deleteFile("test", "test.txt");

    await asserts.assertRejects(() => file.readFile("test", "test.txt"));

    env.unset("FRAME_FILE_DRIVER");
    env.unset("AWS_DEFAULT_REGION");
    env.unset("AWS_ACCESS_KEY_ID");
    env.unset("AWS_SECRET_ACCESS_KEY");
    env.unset("S3_URL");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
