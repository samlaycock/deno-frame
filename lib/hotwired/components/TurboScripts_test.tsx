import { React } from "../deps.ts";
import { asserts } from "../dev_deps.ts";
import render from "../render.ts";
import TurboScripts from "./TurboScripts.tsx";

Deno.test("<TurboScripts /> should render the expected HTML string", () => {
  const result = render(<TurboScripts />);

  asserts.assertEquals(
    result,
    '<script src="https://unpkg.com/@hotwired/turbo@7.0.1/dist/turbo.es5-umd.js" defer=""></script>',
  );
});
