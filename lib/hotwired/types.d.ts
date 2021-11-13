export type FrameScroll = "start" | "end" | "center" | "nearest";

export type FrameTarget = "_top";

export type TurboLinkAction = "advance" | "replace";

export type TurboLinkMethod = "get" | "post" | "put" | "patch" | "delete";

export type TurboFrameTarget = "_top" | string;

export type TurboFrameLoading = "lazy";

export type TurboStreamAction =
  | "append"
  | "prepend"
  | "replace"
  | "update"
  | "remove"
  | "before"
  | "after";

export interface TurboFrameHTMLAttributes<T> extends React.HTMLAttributes<T> {
  id: string;
  src?: string;
  target?: string;
  loading?: TurboFrameLoading;
}

export interface TurboStreamHTMLAttributes<T> extends React.HTMLAttributes<T> {
  action: TurboStreamAction;
  target: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "turbo-frame": React.DetailedHTMLProps<
        TurboFrameHTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "turbo-stream": React.DetailedHTMLProps<
        TurboStreamHTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
