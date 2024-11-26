const JudgeType = require("../utils/JudgeType.js");

describe("judgeType", () => {
  test("类型", () => {
    expect(JudgeType("1", "string")).toBe(true);

    expect(JudgeType(1, "string")).toBe(false);

    expect(JudgeType([], "string")).toBe(false);

    expect(() => {
      JudgeType({}, "object");
    }).toThrow("引用类型不支持传入字符串");

    expect(() => {
      JudgeType([], "object");
    }).toThrow("引用类型不支持传入字符串");

    expect(JudgeType({}, Object)).toBe(true);

    expect(JudgeType([], Array)).toBe(true);

    expect(JudgeType("", Object)).toBe(false);

    expect(JudgeType(new String(""), Object)).toBe(true);
  });
});
