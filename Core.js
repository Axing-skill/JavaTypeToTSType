const WriteFile = require("./WriteFile");
const ReadFile = require("./ReadFile");

/**
 * @class ClassFileConversion 类型转换
 * @param {string} type 读入文件类型
 * @param {string} input 读入文件路径
 * @param {string} output 输出文件路径
 * @param { Array<{ name: string, regexArr: Array<{ regex: string, mode: string }> }> } template_variable 传入模板变量
 * @param {string} typePath 引入类型文件路径
 */
class ClassFileConversion {
  constructor(type, input, output, template_variable, typePath) {
    const rF = new ReadFile(type, input); // 获取文件内容
    rF.content.forEach((file_content) => {
      this.getVariableString(
        new WriteFile(file_content, output),
        template_variable,
        typePath
      ); // 获取变量对应字符串
    });
  }
  /**
   * @method 获取变量对应字符串
   */
  getVariableString(wF, template_variable, typePath) {
    const class_expression = wF.getStrByRegex(template_variable[0].regexArr);
    const class_name = wF.getClassName();

    const mergeVariable = wF.mergeVariable(
      wF.getStrByRegex(template_variable[1].regexArr),
      wF.getStrByRegex(template_variable[2].regexArr),
      wF.getStrByRegex(template_variable[3].regexArr)
    );

    let template = `export default ${class_expression} {\n${mergeVariable}}`;
    const import_str = wF.importDyType(typePath);
    wF.outFile(class_name, import_str + template);
  }
}

new ClassFileConversion(
  "catalogue",
  // "file",
  "./back_type_file",
  // "./back_type_file/LogisticsMiningResultVO.java",
  "/types",
  [
    {
      name: "class_expression",
      regexArr: [
        {
          regex: `class(.(?!\{))*`,
          mode: ""
        }
      ]
    },
    {
      name: "variable_name",
      regexArr: [
        {
          regex: `\\w+?(?=;)`,
          mode: "g"
        }
      ]
    },
    {
      name: "variable_type",
      regexArr: [
        {
          regex: `\\S+(?=\\s\\w+;)`,
          mode: "g"
        }
      ]
    },
    {
      name: "variable_expression",
      regexArr: [
        {
          regex: `(?<=").+(?=")`,
          mode: "g"
        }
      ]
    }
  ],
  "./types/"
);
