import { classNames, isString } from "./utils";

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
