import fileDriver from "./file/driver.ts";
import s3Driver from "./s3/driver.ts";
import testDriver from "./_test/driver.ts";
import type { FileDriver, FileDriverType } from "../types.d.ts";

export default {
  file: fileDriver,
  s3: s3Driver,
  test: testDriver,
} as Record<FileDriverType, FileDriver>;
