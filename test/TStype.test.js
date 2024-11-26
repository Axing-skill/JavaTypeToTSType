const ClassFileConversion = require("../TStype.js");

/**
 * 测试时打开注释，输出文件会在 “ts_type_file” 文件夹下
 */
// describe("测试类型转换类 ClassFileConversion", () => {
//   test("ClassFileConversion 构造函数，传参不全", () => {
//     new ClassFileConversion(
//       "folder",
//       "./back_type_file",
//       "./ts_type_file",
//       "./types",
//       {
//         class_expression: [
//           {
//             regex: `class(.(?!\{))*`,
//             mode: ""
//           }
//         ],
//         variable_name: [
//           {
//             regex: `\\w+?(?=;)`,
//             mode: "g"
//           }
//         ],
//         variable_type: [
//           {
//             regex: `\\S+(?=\\s\\w+;)`,
//             mode: "g"
//           }
//         ],

//         variable_expression: [
//           {
//             regex: `(?<=").+(?=")`,
//             mode: "g"
//           }
//         ]
//       }
//     );
//   });
// });
