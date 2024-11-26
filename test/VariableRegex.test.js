const JudgeVariableRegex = require("../utils/JudgeVariableRegex.js");

describe("JudgeVariableRegexs", () => {
  test("JudgeVariableRegexs 限定传入参数", () => {
    JudgeVariableRegex({
      class_expression: [
        {
          regex: `class(.(?!\{))*`,
          mode: ""
        }
      ],
      variable_name: [
        {
          regex: `class(.(?!\{))*`,
          mode: ""
        }
      ],
      variable_type: [
        {
          regex: `class(.(?!\{))*`,
          mode: ""
        }
      ],
      variable_expression: [
        {
          regex: `class(.(?!\{))*`,
          mode: ""
        }
      ]
    });
  });
});
