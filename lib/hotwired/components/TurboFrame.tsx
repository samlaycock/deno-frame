import { React } from "../deps.ts";
import { TURBO_LINK_ACTIONS } from "../constant.ts";
import {
  TurboFrameLoading,
  TurboFrameTarget,
  TurboLinkAction,
} from "../types.d.ts";

interface TurboFrameProps {
  children: React.ReactNode;
  id: string;
  src?: string;
  target?: TurboFrameTarget;
  action?: TurboLinkAction;
  loading?: TurboFrameLoading;
}

export default function TurboFrame(
  { children, id, src, target, action, loading }: TurboFrameProps,
) {
  if (typeof id === "undefined") {
    throw new Error("'id' is required");
  }

  if (
    typeof action !== "undefined" && !TURBO_LINK_ACTIONS.includes(action)
  ) {
    throw Error(`'action' must be one of ${TURBO_LINK_ACTIONS.join(", ")}`);
  }

  if (typeof loading !== "undefined" && loading !== "lazy") {
    throw new Error("'loading' must be lazy");
  }

  return (
    <turbo-frame
      id={id}
      src={src}
      target={target}
      loading={loading}
      data-turbo-action={action}
    >
      {children}
    </turbo-frame>
  );
}
