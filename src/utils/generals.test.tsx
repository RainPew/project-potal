import { equalStr, fromEnumToOptions, uuidv4 } from "./generals";

describe("generals", () => {
  it("fromEnumToOptions", () => {
    const result = fromEnumToOptions({ test: "value" });
    expect(result).toEqual([{ label: "test", value: "value" }]);
  });

  it("uuidv4", () => {
    const result = uuidv4();
    expect(typeof result).toEqual("string");
  });

  it("equalStr", () => {
    const result = equalStr("test1", "test2");
    expect(result).toEqual(false);
    expect(equalStr("test1", "tesT1")).toEqual(true);
  });
});
