const ClassFileConversion = require("../dist/Core");
new ClassFileConversion(
  "catalogue",
  // "file",
  "../back_type_file",
  // "./back_type_file/LogisticsMiningResultVO.java",
  "../types",
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
  "../types/"
);
