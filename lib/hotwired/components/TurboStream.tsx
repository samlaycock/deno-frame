import { React } from "../deps.ts";
import { TURBO_STREAM_ACTIONS } from "../constant.ts";
import { TurboStreamAction } from "../types.d.ts";

interface TurboFrameProps {
  children: React.ReactNode;
  action: TurboStreamAction;
  target: string;
}

export default function TurboStream(
  { children, action, target }: TurboFrameProps,
) {
  if (!TURBO_STREAM_ACTIONS.includes(action)) {
    throw new Error(
      `'action' must be one of ${TURBO_STREAM_ACTIONS.join(", ")}`,
    );
  }

  if (typeof target === "undefined") {
    throw new Error("'target' is required");
  }

  return (
    <turbo-stream action={action} target={target}>
      <template>
        {children}
      </template>
    </turbo-stream>
  );
}
