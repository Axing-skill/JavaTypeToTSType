const WriteFile = require("../src/WriteFile");

describe("测试文件写出类 WriteFile", () => {
  test("获取文件内容时，没有匹配到任何内容，返回内容本身", () => {
    const wf = new WriteFile(`abc`, "./xxx", "12");
    expect(wf.content).toBe("abc");
  });
  test("获取文件内容时，返回匹配到内容", () => {
    const wf = new WriteFile(`abc`, "./xxx", "a");
    expect(wf.content).toBe("a");
  });
  test("首个正则表达式，没有匹配到相应内容，返回内容本身", () => {
    const wf = new WriteFile(`abc`, "./xxx");
    expect(
      wf.getStrByRegex([
        {
          regex: `@xxx`,
          mode: "g"
        }
      ])
    ).toBe(`abc`);
  });
  test("第二个及之后的正则表达式，没有匹配到相应内容，返回最近一次匹配成功的数组", () => {
    const wf = new WriteFile(
      `public class LogisticsMiningResultVO implements Serializable {
    @ApiModelProperty("集计任务ID")
    private Long mainTaskId;

    /**
     * 参考对比 0 = 差异 1=绝对值
     */
    @ApiModelProperty("参考对比")
    private String consultCompare;

    @ApiModelProperty("设计室 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> rooms;

    @ApiModelProperty("组立部位 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> groups;

    @ApiModelProperty("品番 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> parts;

}`,
      "./xxx"
    );
    expect(
      wf.getStrByRegex([
        {
          regex: `@ApiModelProperty`,
          mode: "g"
        },
        {
          regex: `@Api`,
          mode: "g"
        },
        {
          regex: `@xxx`,
          mode: "g"
        }
      ])
    ).toEqual(["@Api", "@Api", "@Api", "@Api", "@Api"]);
  });
  test("匹配变量", () => {
    const wf = new WriteFile(
      `public class LogisticsMiningResultVO implements Serializable {
    @ApiModelProperty("集计任务ID")
    private Long mainTaskId;

    /**
     * 参考对比 0 = 差异 1=绝对值
     */
    @ApiModelProperty("参考对比")
    private String consultCompare;

    @ApiModelProperty("设计室 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> rooms;

    @ApiModelProperty("组立部位 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> groups;

    @ApiModelProperty("品番 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> parts;

}`,
      "./xxx"
    );
    expect(
      wf.getStrByRegex([
        {
          regex: `\\w+?(?=;)`,
          mode: "g"
        }
      ])
    ).toEqual(["mainTaskId", "consultCompare", "rooms", "groups", "parts"]);
  });

  test("合并变量，类型和注释，变量数组为空", () => {
    const wf = new WriteFile(`abc`, "./xxx", "12");
    expect(
      wf.mergeVariable(
        [],
        ["string", "string", "string"],
        ["注释", "注释", "注释"]
      )
    ).toEqual("");
  });
  test("合并变量，类型和注释，变量类型存在 undefined", () => {
    const wf = new WriteFile(`abc`, "./xxx", "12");
    expect(
      wf.mergeVariable(["a", "b", "c"], ["string"], ["注释", "注释", "注释"])
    ).toEqual(
      `\ta: string;  // 注释\n\n\tb: any;  // 注释\n\n\tc: any;  // 注释\n\n`
    );
  });
  test("写出文件，默认为当前项目的根目录", () => {
    const wf = new WriteFile(`abc`, "./xxx", "12");
    // 测试时打开注释
    // wf.outFile(
    //   "test",
    //   `{
    //     "name": "test",
    //   }`
    // );
  });
  test("导入动态类型", () => {
    const wf = new WriteFile(`abc`, "./xxx", "12");
    wf.dy_type = ["unKnownType"];
    expect(wf.importDyType("./types")).toBe(
      `import unKnownType from "./types/unKnownType"\n`
    );
  });
  test("获取类名", () => {
    const wf = new WriteFile(
      `public class LogisticsMiningResultVO implements Serializable {
    @ApiModelProperty("集计任务ID")
    private Long mainTaskId;

    /**
     * 参考对比 0 = 差异 1=绝对值
     */
    @ApiModelProperty("参考对比")
    private String consultCompare;

    @ApiModelProperty("设计室 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> rooms;

    @ApiModelProperty("组立部位 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> groups;

    @ApiModelProperty("品番 多选 接口返回下拉框 可以不传 不传就是查全部")
    List<String> parts;

}`,
      "./xxx"
    );
    expect(wf.getClassName()).toBe("LogisticsMiningResultVO");
  });
});
