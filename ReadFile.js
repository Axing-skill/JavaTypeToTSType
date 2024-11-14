const fs = require("fs");
const path = require("path");

/**
 * @class 读入文件对象
 * 支持读入字符串, 读入文件, 读入目录
 *
 * @param {string} type 指明读入文件类型
 * @param {string} str 获取该字符串 或 文件路径
 * 字符串，则直接获取该字符串
 * 文件，则读取文件内容
 * 文件目录，则读取目录下所有文件内容
 */
class ReadFile {
  content;
  constructor(type, str) {
    this.handleInput(type, str);
  }
  /**
   * @method 处理不同类型的文件输入
   */
  handleInput(type, str) {
    switch (type) {
      case "string":
        this.content = [str];
        break;
      case "file":
        this.content = [this.readFile(str)];
        break;
      case "catalogue":
        this.content = this.readCatalogue(str);
        break;
      default:
        this.content = str;
        break;
    }
  }
  /**
   * @method 读取文件内容
   * @param {*} filePath  仅支持相对路径引入
   */
  readFile(filePath) {
    filePath = this.getPath(filePath); // 返回正确路径
    /** 读取文件 */
    try {
      return fs.readFileSync(filePath, "utf8");
      // 直接使用
    } catch (err) {
      console.error("请检查你的路径是否正确\n\n", err);
    }
  }
  /**
   * @method 读取目录下所有文件内容
   * @param {*} directoryPath 仅支持相对路径引入
   */
  readCatalogue(cataloguePath) {
    let arr_fileStr = [];
    /** 读取目录下所有文件 */
    cataloguePath = this.getPath(cataloguePath);
    try {
      const files = fs.readdirSync(cataloguePath);
      files.forEach((file) => {
        arr_fileStr.push(this.readFile(path.join(cataloguePath, file)));
      });
    } catch (err) {
      console.error("请检查你的路径是否正确\n\n", err);
    }
    return arr_fileStr;
  }
  /**
   * @method 判断是否是绝对路径
   * @param {*} path  绝对路径形式：D:\\  或者  D:\
   * @returns {boolean} 是否是绝对路径
   */
  isAbsolutePath(path) {
    return /^[a-zA-Z]:\\/.test(path) || /^[a-zA-Z]:/.test(path);
  }
  /**
   * @method 获取正确的路径
   * @param {*} pathStr 路径字符串
   * @returns {string} 正确的路径
   */
  getPath(pathStr) {
    return this.isAbsolutePath(pathStr)
      ? pathStr
      : path.join(__dirname, pathStr);
  }
}

module.exports = ReadFile;
