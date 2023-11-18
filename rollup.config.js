const path = require("path");
const typescript = require("@rollup/plugin-typescript");
const babel = require("@rollup/plugin-babel");
const { DEFAULT_EXTENSIONS } = require("@babel/core");
const { terser } = require("rollup-plugin-terser");
const env = process.env.NODE_ENV;
module.exports = {
  input: "./src/index.ts",
  output: [
    {
      name: "compareVersions",
      file: path.join(__dirname, "lib/index.js"),
      format: "umd",
    },
    {
      dir: path.join(__dirname, "es"),
      format: "es",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      extensions: [...DEFAULT_EXTENSIONS, ".ts"],
    }),
    env === "production"
      ? terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        })
      : void 0,
  ],
};
