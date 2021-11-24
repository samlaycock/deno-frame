import { asserts, mock } from "./dev_deps.ts";
import file from "./file.ts";
import testDriver from "./drivers/_test/driver.ts";
import type { FileDriverType } from "./types.d.ts";

/* file.readFile() */
Deno.test("file.readFile() should use given 'driver'", () => {
  const bucket = "test";
  const fileName = "test.txt";
  const options = {
    driver: "test" as FileDriverType,
  };

  file.readFile(bucket, fileName, options);

  asserts.assertEquals(
    (testDriver.readFile as mock.Spy<void>).calls[0]?.args,
    [
      bucket,
      fileName,
    ],
  );

  testDriver.reset();
});

Deno.test("file.readFile() should call the given 'option.driver's readFile method", () => {
  const driver = {
    name: "test",
    readFile: mock.spy(),
    writeFile: mock.spy(),
    deleteFile: mock.spy(),
  };
  const bucket = "test";
  const fileName = "test.txt";
  const options = {
    driver,
  };

  file.readFile(bucket, fileName, options);

  asserts.assertEquals(driver.readFile.calls[0]?.args, [
    bucket,
    fileName,
  ]);
});

/* file.writeFile() */
Deno.test("file.writeFile() should", () => {
  const bucket = "test";
  const fileName = "test.txt";
  const data = new ReadableStream();
  const options = {
    driver: "test" as FileDriverType,
  };

  file.writeFile(bucket, fileName, data, undefined, options);

  asserts.assertEquals(testDriver.writeFile.calls[0]?.args, [
    bucket,
    fileName,
    data,
    undefined,
  ]);

  testDriver.reset();
});

Deno.test("file.writeFile() should call the given 'option.driver's writeFile method", () => {
  const driver = {
    name: "test",
    readFile: mock.spy(),
    writeFile: mock.spy(),
    deleteFile: mock.spy(),
  };
  const bucket = "test";
  const fileName = "test.txt";
  const data = new ReadableStream();
  const options = {
    driver,
  };

  file.writeFile(bucket, fileName, data, undefined, options);

  asserts.assertEquals(driver.writeFile.calls[0]?.args, [
    bucket,
    fileName,
    data,
    undefined,
  ]);
});

/* file.deleteFile() */
Deno.test("file.deleteFile() should use given 'driver'", () => {
  const bucket = "test";
  const fileName = "test.txt";
  const options = {
    driver: "test" as FileDriverType,
  };

  file.deleteFile(bucket, fileName, options);

  asserts.assertEquals(
    (testDriver.deleteFile as mock.Spy<void>).calls[0]?.args,
    [
      bucket,
      fileName,
    ],
  );

  testDriver.reset();
});

Deno.test("file.deleteFile() should call the given 'option.driver's deleteFile method", () => {
  const driver = {
    name: "test",
    readFile: mock.spy(),
    writeFile: mock.spy(),
    deleteFile: mock.spy(),
  };
  const bucket = "test";
  const fileName = "test.txt";
  const options = {
    driver,
  };

  file.deleteFile(bucket, fileName, options);

  asserts.assertEquals(driver.deleteFile.calls[0]?.args, [
    bucket,
    fileName,
  ]);
});
