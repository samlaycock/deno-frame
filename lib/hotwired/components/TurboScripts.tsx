import { React } from "../deps.ts";

export default function TurboScripts() {
  return (
    <React.Fragment>
      <script
        src="https://unpkg.com/@hotwired/turbo@7.0.1/dist/turbo.es5-umd.js"
        defer
      />
    </React.Fragment>
  );
}
