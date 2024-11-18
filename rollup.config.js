const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("rollup-plugin-terser").terser;

module.exports = {
  input: "TStype.js", // 入口文件
  output: {
    file: "dist/TStype.js", // 输出文件
    format: "cjs"
  },
  plugins: [
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    }),
    terser()
  ]
};
