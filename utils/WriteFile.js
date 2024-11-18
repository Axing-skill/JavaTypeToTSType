#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const typeMap = require("./typeMap");

/**
 * 固定类型
 */
var fixedType = Object.keys(typeMap);

class WriteFile {
  content; // 有效范围的文件内容
  outPath; // 输出路径
  file_content_Regex; // 匹配文件内容 的正则表达式
  dy_type = []; // 记录动态类型，需要导入
  /**
   * @constructor 初始化
   * @param {string} content  文件内容
   * @param {string} outPath 文件输出路径
   * @param {string} file_content_Regex 匹配文件内容 的正则表达式
   *
   */
  constructor(content, outPath, file_content_Regex = `public[^]*`) {
    this.file_content_Regex = file_content_Regex;
    this.outPath = outPath;
    this.content = this.getFileContent(content); // 获取文件内容
  }
  /**
   * @method 获取文件内容
   * @param {*} content 完整的文件内容
   */
  getFileContent(content) {
    return content.match(new RegExp(this.file_content_Regex))[0].trim();
  }

  /**
   * @method 写一个更通用的方法，只需要传入正则表达式或正则表达式数组
   * @param {Array<{ regex: string, mode: string }>} regexArr
   */
  getStrByRegex(regexArr) {
    let content = this.content;
    regexArr.forEach((item) => {
      content = content.toString().match(new RegExp(item.regex, item.mode));
    });
    /**
     * @returns
     * 如果是正则匹配返回数组，包含groups 属性，则取数组[0]
     * 否则返回整个数组
     */
    return content.hasOwnProperty("groups") ? content[0].trim() : content;
  }
  /**
   *@method 合并变量，类型和注释
   */
  mergeVariable(variable_name, variable_type, variable_expression) {
    let variableStr = ""; // 记录所有变量的字符串
    variable_name.forEach((name, index) => {
      variableStr +=
        `\t${name}:  ${this.typeTranslate(variable_type[index])}; // ${
          variable_expression[index]
        }` + "\n\n"; // 合并完整变量
    });
    return variableStr;
  }
  /**
   * @method 转换类型
   * @param {*} type 类型
   * @returns 返回合适类型
   */
  typeTranslate(type) {
    let handleType;

    if (type.includes("List")) {
      // 数组类型
      let arr_ele_type = type.match(/(?<=<)\w+(?=>)/)[0];
      if (fixedType.includes(arr_ele_type)) {
        handleType = `Array<${typeMap[arr_ele_type]}>`;
      } else {
        handleType = `Array<${arr_ele_type}>`;
        this.dy_type.push(arr_ele_type);
      }
    } else if (fixedType.includes(type)) {
      // 其他固定类型
      handleType = typeMap[type];
    } else {
      // 动态类型，需要导入
      handleType = type;
      this.dy_type.push(type);
    }
    return handleType;
  }
  /**
   * @function 写入文件
   * @param {string} className 类名
   * @param {string} complete_class 完整的类
   */
  outFile(className, complete_class) {
    // TypeScript文件的路径
    const filePath = path.join(__dirname, this.outPath);
    // 如果不存在types文件夹，则创建
    fs.mkdir(filePath, { recursive: true }, (err) => {});
    const tsFilePath = path.join(filePath, `${className}.ts`); // types文件夹下的文件
    // 将字符串写入.ts文件
    fs.writeFile(tsFilePath, complete_class, (err) => {
      if (err) {
        console.error("写入文件时出错:", err);
        return;
      }
      console.log("TypeScript 文件写入成功");
    });
  }
  /**
   * @method 导入动态类型
   * @param {string} path
   */
  importDyType(path) {
    if (!this.dy_type.length) return "";
    let import_str = "";
    this.dy_type.forEach((type) => {
      import_str += `import ${type} from "${path}${type}"\n`;
    });
    return import_str;
  }
  /**
   * @method 获取类名
   */
  getClassName() {
    return this.getStrByRegex([
      {
        regex: `(?<=class\\s)\\S(\\S*)`,
        mode: ""
      }
    ]);
  }
}

module.exports = WriteFile;
