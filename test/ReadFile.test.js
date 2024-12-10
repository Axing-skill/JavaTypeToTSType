const ReadFile = require("../src/ReadFile");
const ePath = require("../utils/e-path");

describe("测试文件读取", () => {
  test("读取文件类型，正确路径", () => {
    const rf = new ReadFile("./back_type_file/LogisticsMiningResultVO.java");
    // 断言 数组长度为1
    expect(rf.content).toHaveLength(1);

    // 断言 数组内容为字符串
    expect(rf.content[0]).toEqual(expect.any(String));
  });
  test("读取文件类型，非正确路径", () => {
    expect(() => {
      new ReadFile("../xxx/LogisticsMiningResultVO.java");
    }).toThrow("路径不正确，请检查你的路径");
  });
  test("读取文件夹类型，正确路径，文件夹下包含文件", () => {
    const rf = new ReadFile("./back_type_file");

    // 断言 返回字符串数组类型
    expect(rf.content).toBeInstanceOf(Array);

    // 断言 数组长度大于0
    expect(rf.content.length).toBeGreaterThan(0);
  });
  test("读取文件夹类型，正确路径，文件夹下不包含文件", () => {
    expect(() => {
      new ReadFile("./ts_type_file");
    }).toThrow("当前文件夹为空，不存在任何文件");
  });
  test("读取文件夹类型，非正确路径", () => {
    expect(() => {
      new ReadFile("../xxx");
    }).toThrow("路径不正确，请检查你的路径");
  });
});
