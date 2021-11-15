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
  return (
    <turbo-stream action={action} target={target}>
      <template>
        {children}
      </template>
    </turbo-stream>
  );
}
