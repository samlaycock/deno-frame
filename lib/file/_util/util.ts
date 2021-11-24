import { env } from "../deps.ts";
import { FILE_DRIVERS } from "../constants.ts";
import type { FileDriverType } from "../types.d.ts";

await env.load({
  FRAME_FILE_DRIVER: {
    as: "string",
    enum: FILE_DRIVERS,
  },
  FILE_DRIVER: {
    as: "string",
    enum: FILE_DRIVERS,
  },
});

export function getFileDriver(): FileDriverType {
  const logDriver = env.get("FRAME_FILE_DRIVER") ||
    env.get("FILE_DRIVER") ||
    "file";

  return (logDriver as string).toLowerCase() as FileDriverType;
}
