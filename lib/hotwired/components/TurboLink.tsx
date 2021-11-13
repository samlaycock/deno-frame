import { React } from "../deps.ts";
import { TURBO_LINK_ACTIONS, TURBO_LINK_METHODS } from "../constant.ts";
import { TurboLinkAction, TurboLinkMethod } from "../types.d.ts";

interface TurboLinkProps {
  children: React.ReactNode;
  href: string;
  frame?: string;
  action?: TurboLinkAction;
  method?: TurboLinkMethod;
}

export default function TurboLink(
  { children, href, frame, action, method, ...props }: TurboLinkProps,
) {
  if (typeof href === "undefined") {
    throw new Error("'href' is required");
  }

  if (
    typeof action !== "undefined" && !TURBO_LINK_ACTIONS.includes(action)
  ) {
    throw Error(`'action' must be one of ${TURBO_LINK_ACTIONS.join(", ")}`);
  }

  if (
    typeof method !== "undefined" && !TURBO_LINK_METHODS.includes(method)
  ) {
    throw Error(`'method' must be one of ${TURBO_LINK_METHODS.join(", ")}`);
  }

  return (
    <a
      href={href}
      {...props}
      data-turbo="true"
      data-turbo-action={action}
      data-turbo-frame={frame}
      data-turbo-method={method}
    >
      {children}
    </a>
  );
}
