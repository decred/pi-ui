const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [
    postcssPresetEnv({
      importFrom: "src/css/exports.css",
      features: {
        "nesting-rules": true,
      },
    }),
  ],
};
