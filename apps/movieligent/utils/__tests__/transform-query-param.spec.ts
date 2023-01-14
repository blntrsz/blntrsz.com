import { transformQueryParam } from "../transform-query-param";

const MOCK_STRING = "mockString";

describe("transformQueryParam", () => {
  it("should return the same string on string input", () => {
    expect(transformQueryParam(MOCK_STRING)).toBe(MOCK_STRING);
  });

  it("should return empty string on undefined input", () => {
    expect(transformQueryParam(undefined)).toBe("");
  });

  it("should return the first string in the array", () => {
    expect(transformQueryParam([MOCK_STRING])).toBe(MOCK_STRING);
  });

  it("should return empty string on empty array", () => {
    expect(transformQueryParam([])).toBe("");
  });
});
