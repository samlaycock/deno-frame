import { React } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import render from "../render.ts";
import TurboLink from "./TurboLink.tsx";

Deno.test("<TurboLink /> should render the expected HTML string", () => {
  function TestComponent() {
    return (
      <TurboLink href="/test">
        Test Component
      </TurboLink>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<a href="/test" data-turbo="true">Test Component</a>',
  );
});

Deno.test("<TurboLink /> should render the expected HTML string with the given 'frame'", () => {
  function TestComponent() {
    return (
      <TurboLink href="/test" frame="test">
        Test Component
      </TurboLink>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<a href="/test" data-turbo="true" data-turbo-frame="test">Test Component</a>',
  );
});

Deno.test("<TurboLink /> should render the expected HTML string with the given 'frame'", () => {
  function TestComponent() {
    return (
      <TurboLink href="/test" action="advance">
        Test Component
      </TurboLink>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<a href="/test" data-turbo="true" data-turbo-action="advance">Test Component</a>',
  );
});

Deno.test("<TurboLink /> should render the expected HTML string with the given 'method'", () => {
  function TestComponent() {
    return (
      <TurboLink href="/test" method="delete">
        Test Component
      </TurboLink>
    );
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(
    result,
    '<a href="/test" data-turbo="true" data-turbo-method="delete">Test Component</a>',
  );
});
