const postcssCustomMedia = require("postcss-custom-media");

module.exports = {
  plugins: [
    postcssCustomMedia({
      importFrom: "src/css/export-media.css",
    }),
  ],
};
