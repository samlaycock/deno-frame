import { asserts } from "../../dev_deps.ts";
import testDriver from "./driver.ts";

Deno.test("testDriver.name should be 'test'", () => {
  asserts.assertEquals(testDriver.name, "test");
});

Deno.test("testDriver.readFile() should call the mocked function", () => {
  const bucket = "test_bucket";
  const file = "test_file";

  testDriver.readFile(bucket, file);

  asserts.assertEquals(testDriver.readFile.calls[0]?.args, [
    bucket,
    file,
  ]);

  testDriver.reset();
});

Deno.test("testDriver.writeFile() should call the mocked function", () => {
  const bucket = "test_bucket";
  const file = "test_file";
  const data = new ReadableStream();

  testDriver.writeFile(bucket, file, data);

  asserts.assertEquals(testDriver.writeFile.calls[0]?.args, [
    bucket,
    file,
    data,
  ]);

  testDriver.reset();
});

Deno.test("testDriver.deleteFile() should call the mocked function", () => {
  const bucket = "test_bucket";
  const file = "test_file";

  testDriver.deleteFile(bucket, file);

  asserts.assertEquals(testDriver.deleteFile.calls[0]?.args, [
    bucket,
    file,
  ]);

  testDriver.reset();
});

Deno.test("testDriver.reset() should reset the mocked function", () => {
  const bucket = "test_bucket";
  const file = "test_file";
  const data = new ReadableStream();

  testDriver.readFile(bucket, file);
  testDriver.writeFile(bucket, file, data);
  testDriver.deleteFile(bucket, file);

  asserts.assertEquals(testDriver.readFile.calls.length, 1);
  asserts.assertEquals(testDriver.writeFile.calls.length, 1);
  asserts.assertEquals(testDriver.deleteFile.calls.length, 1);

  testDriver.reset();

  asserts.assertEquals(testDriver.readFile.calls.length, 0);
  asserts.assertEquals(testDriver.writeFile.calls.length, 0);
  asserts.assertEquals(testDriver.deleteFile.calls.length, 0);
});
