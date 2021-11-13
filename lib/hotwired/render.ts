import { React, ReactDOMServer } from "./deps.ts";

export default function render(element: React.ReactNode): string {
  return ReactDOMServer.renderToStaticMarkup(element);
}
