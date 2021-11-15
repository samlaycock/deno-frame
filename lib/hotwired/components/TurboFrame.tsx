import { React } from "../deps.ts";
import { TURBO_LINK_ACTIONS } from "../constant.ts";
import {
  TurboFrameLoading,
  TurboFrameTarget,
  TurboLinkAction,
} from "../types.d.ts";

interface TurboFrameProps {
  children?: React.ReactNode;
  id: string;
  src?: string;
  target?: TurboFrameTarget;
  action?: TurboLinkAction;
  loading?: TurboFrameLoading;
}

export default function TurboFrame(
  { children, id, src, target, action, loading }: TurboFrameProps,
) {
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
