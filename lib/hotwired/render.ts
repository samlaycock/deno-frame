import { React, ReactDOMServer } from "./deps.ts";

interface ReactDomServerPackage {
  renderToStaticMarkup: (
    // deno-lint-ignore no-explicit-any
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  ) => string;
}

export default function render(
  // deno-lint-ignore no-explicit-any
  element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
): string {
  return (ReactDOMServer as ReactDomServerPackage).renderToStaticMarkup(
    element,
  );
}
