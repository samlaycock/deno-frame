import { React } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import render from "../render.ts";
import TurboFrame from "./TurboFrame.tsx";

Deno.test("<TurboFrame /> should render the expected HTML string", () => {
  function TestComponent() {
    return (
      <TurboFrame id="test">
        <h1>Test Component</h1>
      </TurboFrame>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<turbo-frame id="test"><h1>Test Component</h1></turbo-frame>',
  );
});

Deno.test("<TurboFrame /> should render the expected HTML string with the given 'src'", () => {
  function TestComponent() {
    return (
      <TurboFrame id="test" src="/test">
        <h1>Test Component</h1>
      </TurboFrame>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<turbo-frame id="test" src="/test"><h1>Test Component</h1></turbo-frame>',
  );
});

Deno.test("<TurboFrame /> should render the expected HTML string with the given 'target'", () => {
  function TestComponent() {
    return (
      <TurboFrame id="test" target="test">
        <h1>Test Component</h1>
      </TurboFrame>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<turbo-frame id="test" target="test"><h1>Test Component</h1></turbo-frame>',
  );
});

Deno.test("<TurboFrame /> should render the expected HTML string with the given 'action'", () => {
  function TestComponent() {
    return (
      <TurboFrame id="test" action="advance">
        <h1>Test Component</h1>
      </TurboFrame>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<turbo-frame id="test" data-turbo-action="advance"><h1>Test Component</h1></turbo-frame>',
  );
});

Deno.test("<TurboFrame /> should render the expected HTML string with the given 'loading'", () => {
  function TestComponent() {
    return (
      <TurboFrame id="test" loading="lazy">
        <h1>Test Component</h1>
      </TurboFrame>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<turbo-frame id="test" loading="lazy"><h1>Test Component</h1></turbo-frame>',
  );
});
