import { css } from "docz-plugin-css";

export default {
  title: "pi-ui",
  description: "Politeia UI library",
  plugins: [css({ preprocessor: "postcss", cssmodules: true })],
  themeConfig: {
    showPlaygroundEditor: true,
    colors: {
      primary: "#2970ff",
      grayDark: "#3d5873",
      grayLight: "#c4cbd2",
      grayExtraLight: "#e6eaed"
    }
  }
};
