const path = require("path");
const typescript = require("@rollup/plugin-typescript");
const babel = require("@rollup/plugin-babel");
const { DEFAULT_EXTENSIONS } = require("@babel/core");
const { terser } = require("rollup-plugin-terser");
const env = process.env.NODE_ENV;

const plugins = () => {
  return env === "production"
    ? [
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        }),
      ]
    : [];
};

module.exports = {
  input: "./src/index.ts",
  output: [
    {
      dir: path.join(__dirname, "es"),
      format: "es",
      esModule: true,
      exports: "named",
    },
    {
      file: path.join(__dirname, "lib/index.js"),
      format: "cjs",
    },
    {
      name: "compareVersions",
      file: path.join(__dirname, "dist/index.js"),
      format: "umd",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      compilerOptions: {
        declaration: false,
      },
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      extensions: [...DEFAULT_EXTENSIONS, ".ts"],
    }),
    ...plugins(),
  ],
};
