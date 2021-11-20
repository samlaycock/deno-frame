# Frame React Module <!-- omit in toc -->

The `Frame React Module` exports a pinned version of `React` (currently
`17.0.2`), provided by [esm.sh](https://esm.sh), for use to render `HTML` via
`JSX`.

## Contents

- [Contents](#contents)
- [Usage](#usage)

## Usage

To use `React`, `ReactDOM` or `ReactDOMServer` from this module, you can simply
import them:

```javascript
import React from "https://deno.land/x/frame/react/mod.ts";

// or
import { React } from "https://deno.land/x/frame/react/mod.ts";

// and/or
import { ReactDOM } from "https://deno.land/x/frame/react/mod.ts";

// and/or
import { ReactDOMServer } from "https://deno.land/x/frame/react/mod.ts";
```

This module also includes the correct type definitions for the `React` and
`ReactDOM` exports.
