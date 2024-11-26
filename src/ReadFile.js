const fs = require("fs");
const path = require("path");
const ePath = require("../utils/e-path");

/**
 * @class 读入文件对象
 * 支持读入字符串, 读入文件, 读入文件夹
 *
 * @param {"file" || "folder" } type 指明读入文件类型
 * @param {string} str 获取该字符串 或 文件路径
 * 字符串，则直接获取该字符串
 * 文件，则读取文件内容
 * 文件文件夹，则读取文件夹下所有文件内容
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
    if (type !== "file" && type !== "folder") {
      throw new Error("请输入正确的类型");
    }
    switch (type) {
      case "file":
        this.content = [this.readFile(str)];
        break;
      case "folder":
        this.content = this.readCatalogue(str);
        break;
    }
  }
  /**
   * @method 读取文件内容
   * @param {*} filePath  仅支持相对路径引入
   */
  readFile(filePath) {
    filePath = ePath.getPath(filePath); // 返回正确路径
    /** 读取文件 */
    try {
      return fs.readFileSync(filePath, "utf8");
      // 直接使用
    } catch (err) {
      console.error("路径不正确，请检查你的路径\n\n", err);
      throw new Error("路径不正确，请检查你的路径");
    }
  }
  /**
   * @method 读取文件夹下所有文件内容
   * @param {*} directoryPath 仅支持相对路径引入
   */
  readCatalogue(cataloguePath) {
    let arr_fileStr = [];
    /** 读取文件夹下所有文件 */
    cataloguePath = ePath.getPath(cataloguePath);
    try {
      const files = fs.readdirSync(cataloguePath);
      files.forEach((file) => {
        arr_fileStr.push(this.readFile(path.join(cataloguePath, file)));
      });
    } catch (err) {
      console.error("路径不正确，请检查你的路径\n\n", err);
      throw new Error("路径不正确，请检查你的路径");
    }
    if (!arr_fileStr.length) {
      throw new Error("当前文件夹为空，不存在任何文件");
    }
    return arr_fileStr;
  }
}

module.exports = ReadFile;
