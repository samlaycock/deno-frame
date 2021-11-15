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
