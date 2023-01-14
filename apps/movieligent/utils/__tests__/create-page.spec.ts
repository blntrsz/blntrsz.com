import { createPage } from "../create-page";

describe("createPage", () => {
  it('should return undefined on "1"', () => {
    expect(createPage("1")).toBe(undefined);
  });

  it("should return undefined on NaN input", () => {
    expect(createPage("asd")).toBe(undefined);
  });

  it("should return 0 on 0 input", () => {
    expect(createPage("0")).toBe(0);
  });

  it("should convert string number to number", () => {
    expect(createPage("3")).toBe(3);
  });
});
