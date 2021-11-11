module.exports = {
  plugins: ["@babel/plugin-proposal-function-bind"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"],
    },
  },
};
