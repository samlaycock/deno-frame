import { React } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import render from "../render.ts";
import TurboStream from "./TurboStream.tsx";

Deno.test("<TurboStream /> should render the expected HTML string", () => {
  function TestComponent() {
    return (
      <TurboStream action="after" target="test">
        <h1>Test Component</h1>
      </TurboStream>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<turbo-stream action="after" target="test"><template><h1>Test Component</h1></template></turbo-stream>',
  );
});
