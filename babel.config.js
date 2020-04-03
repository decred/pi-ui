module.exports = {
  plugins: [
    "@babel/plugin-proposal-function-bind",
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragmaFrag: "React.Fragment"
      }
    ]
  ],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"]
    }
  }
};
