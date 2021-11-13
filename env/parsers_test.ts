import { asserts } from "./dev_deps.ts";
import {
  asArray,
  asBool,
  asBoolStrict,
  asEnum,
  asFloat,
  asFloatNegative,
  asFloatPositive,
  asInt,
  asIntNegative,
  asIntPositive,
  asJson,
  asJsonArray,
  asJsonObject,
  asPortNumber,
  asRegExp,
  asString,
  asUrlObject,
  asUrlString,
} from "./parsers.ts";

/* asArray */
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

/* asBool */
Deno.test("asBool() should return a boolean", () => {
  const res1 = asBool("TRUE");
  const res2 = asBool("FALSE");
  const res3 = asBool("true");
  const res4 = asBool("false");
  const res5 = asBool("1");
  const res6 = asBool("0");

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

Deno.test("asBool() should return the correct value", () => {
  const res1 = asBool("TRUE");
  const res2 = asBool("FALSE");
  const res3 = asBool("true");
  const res4 = asBool("false");
  const res5 = asBool("1");
  const res6 = asBool("0");

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

Deno.test("asBool() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asBool("invalid"),
    Error,
    'should be either "true", "false", "TRUE", "FALSE", 1, or 0',
  );
});

/* asBoolStrict */
Deno.test("asBoolStrict should return a boolean", () => {
  const res1 = asBoolStrict("TRUE");
  const res2 = asBoolStrict("FALSE");
  const res3 = asBoolStrict("true");
  const res4 = asBoolStrict("false");

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

Deno.test("asBoolStrict should return the correct value", () => {
  const res1 = asBoolStrict("TRUE");
  const res2 = asBoolStrict("FALSE");
  const res3 = asBoolStrict("true");
  const res4 = asBoolStrict("false");

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

Deno.test("asBool() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asBoolStrict("1"),
    Error,
    'should be either "true", "false", "TRUE", or "FALSE"',
  );

  asserts.assertThrows(
    () => asBoolStrict("0"),
    Error,
    'should be either "true", "false", "TRUE", or "FALSE"',
  );
});

/* asEnum */
Deno.test("asEnum() should return a string", () => {
  const res = asEnum("test", { valid: ["test"] });

  asserts.assertEquals(
    typeof res,
    "string",
    `asEnum returned ${typeof res} for value "test"`,
  );
});

Deno.test("asEnum() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asEnum("invalid", { valid: ["test"] }),
    Error,
    `should be one of [test]`,
  );
});

/* asFloat */
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

/* asFloatNegative */
Deno.test("asFloatNegative() should return a number", () => {
  const res = asFloatNegative("-1.1");

  asserts.assertEquals(
    typeof res,
    "number",
    `asFloatNegative returned ${typeof res} for value "-1.1"`,
  );
});

Deno.test("asFloatNegative() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asFloatNegative("1.1"),
    Error,
    "should be a negative float",
  );
});

/* asFloatPositive */
Deno.test("asFloatPositive() should return a number", () => {
  const res = asFloatPositive("1.1");

  asserts.assertEquals(
    typeof res,
    "number",
    `asFloatPositive returned ${typeof res} for value "-1.1"`,
  );
});

Deno.test("asFloatPositive() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asFloatPositive("-1.1"),
    Error,
    "should be a positive float",
  );
});

/* asInt */
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

/* asIntNegative */
Deno.test("asIntNegative() should return a number", () => {
  const res = asIntNegative("-1");

  asserts.assertEquals(
    typeof res,
    "number",
    `asIntNegative returned ${typeof res} for value "-1"`,
  );
});

Deno.test("asIntNegative() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asIntNegative("1"),
    Error,
    "should be a negative integer",
  );
});

/* asIntPositive */
Deno.test("asIntNegative() should return a number", () => {
  const res = asIntPositive("1");

  asserts.assertEquals(
    typeof res,
    "number",
    `asIntPositive returned ${typeof res} for value "1"`,
  );
});

Deno.test("asIntPositive() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asIntPositive("-1"),
    Error,
    "should be a positive integer",
  );
});

/* asJson */
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

/* asJsonArray */
Deno.test("asJsonArray() should return an array", () => {
  const res = asJsonArray('["test"]');

  asserts.assert(
    Array.isArray(res),
    `asJsonArray returned ${typeof res} for value "["test"]"`,
  );
});

Deno.test("asJsonArray() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asJsonArray('"test"'),
    Error,
    "should be a parseable JSON Array",
  );
  asserts.assertThrows(
    () => asJsonArray("1"),
    Error,
    "should be a parseable JSON Array",
  );
  asserts.assertThrows(
    () => asJsonArray("true"),
    Error,
    "should be a parseable JSON Array",
  );
  asserts.assertThrows(
    () => asJsonArray('{"test":true}'),
    Error,
    "should be a parseable JSON Array",
  );
});

/* asJsonObject */
Deno.test("asJsonObject() should return an object", () => {
  const res = asJsonObject('{"test":true}');

  asserts.assertEquals(
    typeof res,
    "object",
    `asJsonObject returned ${typeof res} for value "{"test":true}"`,
  );
  asserts.assertEquals(
    Array.isArray(res),
    false,
    'asJsonObject returned an Array for value "{"test":true}"',
  );
});

Deno.test("asJsonObject() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asJsonObject('"test"'),
    Error,
    "should be a parseable JSON Object",
  );
  asserts.assertThrows(
    () => asJsonObject("1"),
    Error,
    "should be a parseable JSON Object",
  );
  asserts.assertThrows(
    () => asJsonObject("true"),
    Error,
    "should be a parseable JSON Object",
  );
  asserts.assertThrows(
    () => asJsonObject('["test"]'),
    Error,
    "should be a parseable JSON Object",
  );
});

/* asPortNumber */
Deno.test("asPortNumber() should return a number", () => {
  const res = asPortNumber("3000");

  asserts.assertEquals(
    typeof res,
    "number",
    `asPortNumber returned ${typeof res} for value "3000"`,
  );
});

Deno.test("asPortNumber() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asPortNumber("99999"),
    Error,
    "cannot assign a port number greater than 65535",
  );
});

/* asRegExp */
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

/* asString */
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

/* asUrlObject */
Deno.test("asUrlObject() should return a URL instance", () => {
  const res = asUrlObject("http://test.com");

  asserts.assert(
    res instanceof URL,
    `asUrlObject returned ${res.constructor} for value "http://test.com"`,
  );
});

Deno.test("asUrlObject() should throw when given an invalid value argument", () => {
  asserts.assertThrows(
    () => asUrlObject("invalid"),
    Error,
    "should be a valid URL",
  );
});

/* asUrlString */
Deno.test("asUrlString() should return a URL instance", () => {
  const res = asUrlString("http://test.com");

  asserts.assertEquals(
    typeof res,
    "string",
    `asUrlObject returned ${typeof res} for value "http://test.com"`,
  );
});

Deno.test('asUrlString() should strip trailing "/" characters', () => {
  const res1 = asUrlString("http://test.com");
  const res2 = asUrlString("http://test.com/");
  const res3 = asUrlString("http://test.com/test");
  const res4 = asUrlString("http://test.com/test/");

  asserts.assertEquals(
    res1,
    "http://test.com",
    `asUrlObject returned ${res1} for value "http://test.com"`,
  );
  asserts.assertEquals(
    res2,
    "http://test.com",
    `asUrlObject returned ${res2} for value "http://test.com/"`,
  );
  asserts.assertEquals(
    res3,
    "http://test.com/test",
    `asUrlObject returned ${res3} for value "http://test.com/test"`,
  );
  asserts.assertEquals(
    res4,
    "http://test.com/test",
    `asUrlObject returned ${res4} for value "http://test.com/test/"`,
  );
});
