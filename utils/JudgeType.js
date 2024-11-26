function JudgeType(variables, types) {
  if (types == "object") throw new Error("引用类型不支持传入字符串");
  // 基本类型
  if (typeof types == "string") {
    return typeof variables == types;
  } else {
    // 引用类型
    return variables instanceof types;
  }
}

module.exports = JudgeType;
