module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        importFrom: "src/css/exports.css",
        features: {
          "nesting-rules": true,
        },
      },
    ],
  ],
};
