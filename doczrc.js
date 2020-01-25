import { createPlugin } from "docz-core";
import copyFileSync from "fs-copy-file-sync";

const customPlugin = () =>
  createPlugin({
    onPostBuild: () => {
      copyFileSync("./_redirects", "./.docz/dist/_redirects");
    }
  });

export default {
  title: "pi-ui",
  description: "Politeia UI library",
  src: "./src",
  plugins: [customPlugin()],
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
