import { env, streams } from "../../deps.ts";
import { asserts } from "../../dev_deps.ts";
import fileDriver from "./driver.ts";

Deno.test({
  name: "File file driver should save file data to local disk",
  fn: async () => {
    env.set("FRAME_FILE_DRIVER", "file");
    env.set("FRAME_FILE_DIR", "./tmp");

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

    env.delete("FRAME_FILE_DRIVER");
    env.delete("FRAME_FILE_DIR");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
