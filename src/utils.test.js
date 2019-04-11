import { classNames, isString, isObject } from "./utils";

describe("classNames util", () => {
  it("returns empty if argument is falsy", () => {
    expect(classNames(undefined)).toBe("");
    expect(classNames(null)).toBe("");
    expect(classNames("")).toBe("");
  });
  it("returns a string with the string args separated by 1 space", () => {
    expect(classNames("test", "abc", "def")).toBe("test abc def");
  });
  it("does not include falsy values in the response", () => {
    expect(classNames(undefined, null, "test")).toBe("test");
  });
  it("does not include non-string values in the response", () => {
    expect(classNames("test", ["abc"], { key: "def" })).toBe("test");
  });
});

describe("isString util", () => {
  it("returns true if argument is a string", () => {
    expect(isString("abc")).toBeTruthy();
    expect(isString("")).toBeTruthy();
  });
  it("returns false if argument is not string", () => {
    expect(isString(["abc"])).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
  });
});

describe("isObject util", () => {
  it("returns true if argument is an object", () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject({ key: "value" })).toBeTruthy();
  });
  it("returns false if argument is not an object", () => {
    expect(isObject(["abc"])).toBeFalsy();
    expect(isObject("test")).toBeFalsy();
    expect(isObject(3)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
  });
});
