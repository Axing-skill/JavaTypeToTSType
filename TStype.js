const WriteFile = require("./src/WriteFile");
const ReadFile = require("./src/ReadFile");
const JudgeType = require("./utils/JudgeType.js");
const JudgeVariableRegex = require("./utils/JudgeVariableRegex.js");

/**
 * @class ClassFileConversion 类型转换
 * @param {string} type 读入文件类型
 * @param {string} input 读入文件路径
 * @param {string} output 输出文件路径
 * @param {string} typePath 引入类型文件的前缀
 * @param { { [name: string]: Array<{ regex: string, mode: string } } } variable_regex 获取变量的正则表达式
 */
class ClassFileConversion {
  constructor(type, input, output, typePath, variable_regex) {
    judgeParams(); // 判断参数是否正确
    getContent.call(this); // 获取文件内容

    /**
     * @function 判断参数是否正确
     */
    function judgeParams() {
      if (
        !JudgeType(type, "string") ||
        !JudgeType(input, "string") ||
        !JudgeType(output, "string") ||
        !JudgeType(typePath, "string")
      ) {
        throw new Error("请传入正确类型的参数");
      }
      JudgeVariableRegex(variable_regex);
    }

    /**
     * @function 获取文件内容
     */
    function getContent() {
      const rF = new ReadFile(type, input); // 获取文件内容
      rF.content.forEach((file_content) => {
        this.getVariableString(
          new WriteFile(file_content, output),
          variable_regex,
          typePath
        ); // 获取变量对应字符串
      });
    }
  }
  /**
   * @method 获取变量对应字符串
   */
  getVariableString(wF, variable_regex, typePath) {
    const class_expression = wF.getStrByRegex(
      variable_regex["class_expression"]
    );
    const class_name = wF.getClassName();

    const mergeVariable = wF.mergeVariable(
      wF.getStrByRegex(variable_regex["variable_name"]),
      wF.getStrByRegex(variable_regex["variable_type"]),
      wF.getStrByRegex(variable_regex["variable_expression"])
    );

    let template = `export default ${class_expression} {\n${mergeVariable}}`;
    const import_str = wF.importDyType(typePath);
    wF.outFile(class_name, import_str + template);
  }
}

module.exports = ClassFileConversion;
