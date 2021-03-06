import { env, streams } from "../../deps.ts";
import { asserts } from "../../dev_deps.ts";
import fileDriver from "./driver.ts";

Deno.test({
  name: "File file driver should save file data to local disk",
  fn: async () => {
    env.set("FRAME_FILE_DRIVER", "file");

    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();

    const fileContents = "START\n\nThis is a test file.\n\nEND";
    const fileBuffer = textEncoder.encode(fileContents);
    const fileReader = await streams.readerFromIterable([fileBuffer]);
    const fileStream = await streams.readableStreamFromReader(fileReader);

    await fileDriver.writeFile("test", "test.txt", fileStream);

    const result = await fileDriver.readFile("test", "test.txt");
    const resultReader = await streams.readerFromIterable(result);
    const resultBuffer = await streams.readAll(resultReader);
    const resultContents = textDecoder.decode(resultBuffer);

    asserts.assertEquals(fileContents, resultContents);

    await fileDriver.deleteFile("test", "test.txt");

    await asserts.assertRejects(() => fileDriver.readFile("test", "test.txt"));

    await Deno.remove("./tmp/test");
    await Deno.remove("./tmp");

    env.unset("FRAME_FILE_DRIVER");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "File file driver should save file data to local disk using the FRAME_FILE_DIR environment variables",
  fn: async () => {
    env.set("FRAME_FILE_DRIVER", "file");
    env.set("FRAME_FILE_DIR", "./frame-file-dir");

    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();

    const fileContents = "START\n\nThis is a test file.\n\nEND";
    const fileBuffer = textEncoder.encode(fileContents);
    const fileReader = await streams.readerFromIterable([fileBuffer]);
    const fileStream = await streams.readableStreamFromReader(fileReader);

    await fileDriver.writeFile("test", "test.txt", fileStream);

    const result = await fileDriver.readFile("test", "test.txt");
    const resultReader = await streams.readerFromIterable(result);
    const resultBuffer = await streams.readAll(resultReader);
    const resultContents = textDecoder.decode(resultBuffer);

    asserts.assertEquals(fileContents, resultContents);

    await fileDriver.deleteFile("test", "test.txt");

    await asserts.assertRejects(() => fileDriver.readFile("test", "test.txt"));

    await Deno.remove("./frame-file-dir/test");
    await Deno.remove("./frame-file-dir");

    env.unset("FRAME_FILE_DRIVER");
    env.unset("FRAME_FILE_DIR");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "File file driver should save file data to local disk using the FILE_DIR environment variables",
  fn: async () => {
    env.set("FRAME_FILE_DRIVER", "file");
    env.set("FILE_DIR", "./file-dir");

    const textEncoder = new TextEncoder();
    const textDecoder = new TextDecoder();

    const fileContents = "START\n\nThis is a test file.\n\nEND";
    const fileBuffer = textEncoder.encode(fileContents);
    const fileReader = await streams.readerFromIterable([fileBuffer]);
    const fileStream = await streams.readableStreamFromReader(fileReader);

    await fileDriver.writeFile("test", "test.txt", fileStream);

    const result = await fileDriver.readFile("test", "test.txt");
    const resultReader = await streams.readerFromIterable(result);
    const resultBuffer = await streams.readAll(resultReader);
    const resultContents = textDecoder.decode(resultBuffer);

    asserts.assertEquals(fileContents, resultContents);

    await fileDriver.deleteFile("test", "test.txt");

    await asserts.assertRejects(() => fileDriver.readFile("test", "test.txt"));

    await Deno.remove("./file-dir/test");
    await Deno.remove("./file-dir");

    env.unset("FRAME_FILE_DRIVER");
    env.unset("FILE_DIR");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
