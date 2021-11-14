import env, { config, get, set, unset } from "./env.ts";
import * as parsers from "./parsers.ts";
import { ENV_PARSERS } from "./constants.ts";
import type { EnvParser, EnvParserOptions, EnvValues } from "./types.d.ts";

export default env;

export { config, ENV_PARSERS, get, parsers, set, unset };

export type { EnvParser, EnvParserOptions, EnvValues };
