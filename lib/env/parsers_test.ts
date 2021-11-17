import { asserts } from "./dev_deps.ts";
import {
  asArray,
  asBoolean,
  asFloat,
  asInt,
  asJson,
  asRegExp,
  asString,
  asUrl,
} from "./parsers.ts";

/* asArray() */
Deno.test("asArray() should return an Array", () => {
  const res = asArray("one,two,three");

  asserts.assert(
    Array.isArray(res),
    `asArray returned ${typeof res} for value "one,two,three"`,
  );
});

Deno.test("asArray() should return an Array with the correct length", () => {
  const res1 = asArray("one,two,three");
  const res2 = asArray("");

  asserts.assertEquals(
    res1.length,
    3,
    `asArray returned an array of length ${res1.length} for value "one,two,three"`,
  );
  asserts.assertEquals(
    res2.length,
    0,
    `asArray returned an array of length ${res2.length} for value ""`,
  );
});

Deno.test("asArray() should use the passed in delimiter", () => {
  const res = asArray("one.two.three", { delimiter: "." });

  asserts.assert(Array.isArray(res), `asArray returned ${typeof res} (${res})`);
  asserts.assertEquals(
    res.length,
    3,
    `asArray returned an array of length ${res.length} for value "one.two.three"`,
  );
});

Deno.test("asArray() should filter out empty values", () => {
  const res = asArray("one,,three");

  asserts.assertEquals(
    res.length,
    2,
    `asArray returned an array of length ${res.length} for value "one,,three"`,
  );
});

/* asBoolean() */
Deno.test("asBoolean() should return a boolean", () => {
  const res1 = asBoolean("TRUE");
  const res2 = asBoolean("FALSE");
  const res3 = asBoolean("true");
  const res4 = asBoolean("false");
  const res5 = asBoolean("1");
  const res6 = asBoolean("0");

  asserts.assertEquals(
    typeof res1,
    "boolean",
    `asBool returned a ${typeof res1} for value "TRUE"`,
  );
  asserts.assertEquals(
    typeof res2,
    "boolean",
    `asBool returned a ${typeof res1} for value "FALSE"`,
  );
  asserts.assertEquals(
    typeof res3,
    "boolean",
    `asBool returned a ${typeof res1} for value "true"`,
  );
  asserts.assertEquals(
    typeof res4,
    "boolean",
    `asBool returned a ${typeof res1} for value "false"`,
  );
  asserts.assertEquals(
    typeof res5,
    "boolean",
    `asBool returned a ${typeof res1} for value "1"`,
  );
  asserts.assertEquals(
    typeof res6,
    "boolean",
    `asBool returned a ${typeof res1} for value "0"`,
  );
});

Deno.test("asBoolean() should return the correct value", () => {
  const res1 = asBoolean("TRUE");
  const res2 = asBoolean("FALSE");
  const res3 = asBoolean("true");
  const res4 = asBoolean("false");
  const res5 = asBoolean("1");
  const res6 = asBoolean("0");

  asserts.assertEquals(res1, true, `asBool returned ${res1} for value "TRUE"`);
  asserts.assertEquals(
    res2,
    false,
    `asBool returned ${res1} for value "FALSE"`,
  );
  asserts.assertEquals(res3, true, `asBool returned ${res1} for value "true"`);
  asserts.assertEquals(
    res4,
    false,
    `asBool returned ${res1} for value "false"`,
  );
  asserts.assertEquals(res5, true, `asBool returned ${res1} for value "1"`);
  asserts.assertEquals(res6, false, `asBool returned ${res1} for value "0"`);
});

Deno.test("asBoolean() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asBoolean("invalid"),
    Error,
    'should be either "true", "false", "TRUE", "FALSE", 1, or 0',
  );
});

Deno.test("asBoolean() with 'options.strict' should return a boolean", () => {
  const res1 = asBoolean("TRUE", { strict: true });
  const res2 = asBoolean("FALSE", { strict: true });
  const res3 = asBoolean("true", { strict: true });
  const res4 = asBoolean("false", { strict: true });

  asserts.assertEquals(
    res1,
    true,
    `asBoolStrict returned ${res1} for value "TRUE"`,
  );
  asserts.assertEquals(
    res2,
    false,
    `asBoolStrict returned ${res1} for value "FALSE"`,
  );
  asserts.assertEquals(
    res3,
    true,
    `asBoolStrict returned ${res1} for value "true"`,
  );
  asserts.assertEquals(
    res4,
    false,
    `asBoolStrict returned ${res1} for value "false"`,
  );
});

Deno.test("asBoolean() with 'options.strict' should return the correct value", () => {
  const res1 = asBoolean("TRUE", { strict: true });
  const res2 = asBoolean("FALSE", { strict: true });
  const res3 = asBoolean("true", { strict: true });
  const res4 = asBoolean("false", { strict: true });

  asserts.assertEquals(
    res1,
    true,
    `asBoolStrict returned ${res1} for value "TRUE"`,
  );
  asserts.assertEquals(
    res2,
    false,
    `asBoolStrict returned ${res1} for value "FALSE"`,
  );
  asserts.assertEquals(
    res3,
    true,
    `asBoolStrict returned ${res1} for value "true"`,
  );
  asserts.assertEquals(
    res4,
    false,
    `asBoolStrict returned ${res1} for value "false"`,
  );
});

Deno.test("asBoolean() with 'options.strict' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asBoolean("1", { strict: true }),
    Error,
    'should be either "true", "false", "TRUE", or "FALSE"',
  );

  asserts.assertThrows(
    () => asBoolean("0", { strict: true }),
    Error,
    'should be either "true", "false", "TRUE", or "FALSE"',
  );
});

/* asFloat() */
Deno.test("asFloat() should return a number", () => {
  const res = asFloat("1.1");

  asserts.assertEquals(
    typeof res,
    "number",
    `asFloat returned ${typeof res} for value "1.1"`,
  );
});

Deno.test("asFloat() should throw when given an invalid value argument", () => {
  asserts.assertThrows(() => asFloat("1.0"), Error, "should be a valid float");
});

Deno.test("asFloat() with 'options.negative' should return a number", () => {
  const res = asFloat("-1.1", { negative: true });

  asserts.assertEquals(
    typeof res,
    "number",
    `asFloat returned ${typeof res} for value "-1.1"`,
  );
});

Deno.test("asFloat() with 'options.negative' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asFloat("1.1", { negative: true }),
    Error,
    "should be a negative float",
  );
});

Deno.test("asFloat() with 'options.positive' should return a number", () => {
  const res = asFloat("1.1", { positive: true });

  asserts.assertEquals(
    typeof res,
    "number",
    `asFloat returned ${typeof res} for value "-1.1"`,
  );
});

Deno.test("asFloat() with 'options.positive' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asFloat("-1.1", { positive: true }),
    Error,
    "should be a positive float",
  );
});

/* asInt() */
Deno.test("asInt() should return a number", () => {
  const res = asInt("1");

  asserts.assertEquals(
    typeof res,
    "number",
    `asInt returned ${typeof res} for value "1"`,
  );
});

Deno.test("asInt() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asInt("invalid"),
    Error,
    "should be a valid integer",
  );
});

Deno.test("asInt() with 'options.negative' should return a number", () => {
  const res = asInt("-1", { negative: true });

  asserts.assertEquals(
    typeof res,
    "number",
    `asInt returned ${typeof res} for value "-1"`,
  );
});

Deno.test("asInt() with 'options.negative' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asInt("1", { negative: true }),
    Error,
    "should be a negative integer",
  );
});

Deno.test("asInt() with 'options.positive' should return a number", () => {
  const res = asInt("1", { positive: true });

  asserts.assertEquals(
    typeof res,
    "number",
    `asInt returned ${typeof res} for value "1"`,
  );
});

Deno.test("asInt() with 'options.positive' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asInt("-1", { positive: true }),
    Error,
    "should be a positive integer",
  );
});

Deno.test("asInt() with 'options.port' should return a number", () => {
  const res = asInt("3000", { port: true });

  asserts.assertEquals(
    typeof res,
    "number",
    `asPortNumber returned ${typeof res} for value "3000"`,
  );
});

Deno.test("asInt() with 'options.port' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asInt("0", { port: true }),
    Error,
    "should a port number no greater than 65535",
  );
  asserts.assertThrows(
    () => asInt("-1", { port: true }),
    Error,
    "should a port number no greater than 65535",
  );
  asserts.assertThrows(
    () => asInt("99999", { port: true }),
    Error,
    "should a port number no greater than 65535",
  );
});

/* asJson() */
Deno.test("asJson() should return the correct JSON value", () => {
  const res1 = asJson('{"test":true}');
  const res2 = asJson('["test"]');
  const res3 = asJson('"test"');
  const res4 = asJson("1");
  const res5 = asJson("true");

  asserts.assertEquals(
    typeof res1,
    "object",
    `asJson returned ${typeof res1} for value "{"test":true}"`,
  );
  asserts.assert(
    Array.isArray(res2),
    `asJson returned ${typeof res2} for value "["test"]"`,
  );
  asserts.assertEquals(
    typeof res3,
    "string",
    `asJson returned ${typeof res3} for value ""test""`,
  );
  asserts.assertEquals(
    typeof res4,
    "number",
    `asJson returned ${typeof res4} for value "1"`,
  );
  asserts.assertEquals(
    typeof res5,
    "boolean",
    `asJson returned ${typeof res5} for value "true"`,
  );
});

Deno.test("asJson() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asJson("test"),
    Error,
    "should be valid (parseable) JSON",
  );
});

Deno.test("asJson() with 'options.array' should return an array", () => {
  const res = asJson('["test"]', { array: true });

  asserts.assert(
    Array.isArray(res),
    `asJson returned ${typeof res} for value "["test"]"`,
  );
});

Deno.test("asJson() with 'options.array' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asJson('"test"', { array: true }),
    Error,
    "should be a parseable JSON Array",
  );
  asserts.assertThrows(
    () => asJson("1", { array: true }),
    Error,
    "should be a parseable JSON Array",
  );
  asserts.assertThrows(
    () => asJson("true", { array: true }),
    Error,
    "should be a parseable JSON Array",
  );
  asserts.assertThrows(
    () => asJson('{"test":true}', { array: true }),
    Error,
    "should be a parseable JSON Array",
  );
});

Deno.test("asJson() with 'options.object' should return an object", () => {
  const res = asJson('{"test":true}', { object: true });

  asserts.assertEquals(
    typeof res,
    "object",
    `asJson returned ${typeof res} for value "{"test":true}"`,
  );
  asserts.assertEquals(
    Array.isArray(res),
    false,
    'asJson returned an Array for value "{"test":true}"',
  );
});

Deno.test("asJson() with 'options.object' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asJson('"test"', { object: true }),
    Error,
    "should be a parseable JSON Object",
  );
  asserts.assertThrows(
    () => asJson("1", { object: true }),
    Error,
    "should be a parseable JSON Object",
  );
  asserts.assertThrows(
    () => asJson("true", { object: true }),
    Error,
    "should be a parseable JSON Object",
  );
  asserts.assertThrows(
    () => asJson('["test"]', { object: true }),
    Error,
    "should be a parseable JSON Object",
  );
});

/* asRegExp() */
Deno.test("asRegExp() should return a RegExp instance", () => {
  const res = asRegExp("/test/");

  asserts.assert(
    res instanceof RegExp,
    `asRegExp returned ${res.constructor} for value "/test/"`,
  );
});

Deno.test("asRegExp() should apply the given flags", () => {
  const res1 = asRegExp("/test/", { flags: "gi" });
  const res2 = asRegExp("/test/", {});

  asserts.assertEquals(
    res1.flags,
    "gi",
    `asRegExp has the flags ${res1.flags} for flags value "gi"`,
  );
  asserts.assertEquals(
    res2.flags,
    "",
    `asRegExp has the flags ${res2.flags} for flags value ""`,
  );
});

Deno.test("asRegExp() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asRegExp("\\"),
    Error,
    "should be a valid RegExp",
  );
});

Deno.test("asRegExp() should throw when given invalid flags", () => {
  asserts.assertThrows(
    () => asRegExp("/test/", { flags: "invalid" }),
    Error,
    "invalid RegExp flags",
  );
});

/* asString() */
Deno.test("asString() should return a string", () => {
  const res = asString("test");

  asserts.assertEquals(
    typeof res,
    "string",
    `asString returned ${typeof res} for value "test"`,
  );
});

Deno.test("asString() should return the given value", () => {
  const res = asString("test");

  asserts.assertEquals(
    res,
    "test",
    `asString returned "${res}" for value "test"`,
  );
});

Deno.test("asString() with 'options.enum' should return a string", () => {
  const res = asString("test", { enum: ["test"] });

  asserts.assertEquals(
    typeof res,
    "string",
    `asEnum returned ${typeof res} for value "test"`,
  );
});

Deno.test("asString() with 'options.enum' should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asString("invalid", { enum: ["test"] }),
    Error,
    `should be one of test`,
  );
});

/* asUrlObject() */
Deno.test("asUrl() should return a URL instance", () => {
  const res = asUrl("http://test.com");

  asserts.assert(
    res instanceof URL,
    `asUrl returned ${res.constructor} for value "http://test.com"`,
  );
});

Deno.test("asUrl() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asUrl("invalid"),
    Error,
    "should be a valid URL",
  );
});
