const JudgeType = require("./JudgeType");
/**
 * @function 判断参数
 * @param { [name: string]: Array<{ regex: string, mode: string } }  variable_regex
 */
function JudgeVariableRegex(variable_regex) {
  // 必须是对象
  if (!JudgeType(variable_regex, Object)) throw new Error("参数必须是对象");
  // 必须包含key 值
  if (
    Object.keys(variable_regex).toString() !==
    "class_expression,variable_name,variable_type,variable_expression"
  )
    throw new Error(
      `参数必须包含 class_expression, variable_name, variable_type, variable_expression 参数`
    );

  // 每一个value 都是Regexs 类型
  Object.values(variable_regex).forEach((regex_arr) => {
    // 必须是数组
    if (!JudgeType(regex_arr, Array)) throw new Error("参数必须是数组");
    if (!regex_arr.length) throw new Error("数组不能为空");

    regex_arr.forEach((regex_obj) => {
      // 数组元素必须是对象
      if (!JudgeType(regex_obj, Object)) throw new Error("数组元素必须是对象");
      // 对象必需包含 `[regex, mode]` key
      if (Object.keys(regex_obj).toString() !== `regex,mode`)
        throw new Error("对象必需包含 'regex', 'mode'");
      // regex 的value不可为空
      if (!regex_obj.regex) throw new Error("regex 的value不可为空");
      // regex 的value必须是字符串
      if (
        !JudgeType(regex_obj.regex, "string") &&
        !JudgeType(regex_obj.regex, String)
      )
        throw new Error("regex 的value必须是字符串");
    });
  });
}

module.exports = JudgeVariableRegex;
