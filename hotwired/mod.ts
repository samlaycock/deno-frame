import { React } from "./deps.ts";
import render from "./render.ts";
import TurboFrame from "./components/TurboFrame.tsx";
import TurboLink from "./components/TurboLink.tsx";
import TurboStream from "./components/TurboStream.tsx";
import {
  TURBO_LINK_ACTIONS,
  TURBO_LINK_METHODS,
  TURBO_STREAM_ACTIONS,
  TURBO_STREAM_MIME_TYPE,
} from "./constant.ts";
import type {
  FrameScroll,
  FrameTarget,
  TurboFrameLoading,
  TurboFrameTarget,
  TurboLinkAction,
  TurboLinkMethod,
  TurboStreamAction,
} from "./types.d.ts";

export default { render };

export {
  React,
  render,
  TURBO_LINK_ACTIONS,
  TURBO_LINK_METHODS,
  TURBO_STREAM_ACTIONS,
  TURBO_STREAM_MIME_TYPE,
  TurboFrame,
  TurboLink,
  TurboStream,
};

export type {
  FrameScroll,
  FrameTarget,
  TurboFrameLoading,
  TurboFrameTarget,
  TurboLinkAction,
  TurboLinkMethod,
  TurboStreamAction,
};
