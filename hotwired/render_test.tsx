import { React } from "./deps.ts";
import { asserts } from "./dev_deps.ts";
import render from "./render.ts";

Deno.test("render() should render the expected HTML string", () => {
  function TestComponent() {
    return <h1>Test Component</h1>;
  }

  const result = render(<TestComponent />);

  asserts.assertEquals(result, "<h1>Test Component</h1>");
});
