const path = require("path");

/**
 * @function 判断路径是否为绝对路径
 * @param {string} path 传入路径
 * @returns {boolean} 返回布尔值，true表示绝对路径，false表示相对路径
 */
function judgeAbsolutePath(pathStr) {
  if (!(typeof pathStr === "string")) throw new Error("传入参数必须为字符串");
  return /(?<=\w+)(:\\|:\/\/)/.test(path.normalize(pathStr));
}

/**
 * @function getPath 获取绝对路径,默认以当前进程为绝对路径
 * @param {string} pathStr 传入路径
 * @param {string} prefixPath 传入相对路径的基准目录
 * @returns {string} 返回完整路径
 */
function getPath(pathStr, prefixPath) {
  if (!(typeof pathStr === "string")) throw new Error("传入参数必须为字符串");
  if (prefixPath && !(typeof prefixPath === "string"))
    throw new Error("传入参数必须为字符串");
  pathStr = path.normalize(pathStr);
  if (judgeAbsolutePath(pathStr)) return pathStr;
  return prefixPath ? path.join(prefixPath, pathStr) : path.resolve(pathStr);
}

module.exports = {
  judgeAbsolutePath,
  getPath
};
