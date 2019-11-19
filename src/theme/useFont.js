import { useState, useLayoutEffect } from "react";
import lightTheme from "./lightTheme";

const useFont = (customFontConfig) => {
  const [fontConfig, setFontConfig] = useState(null);
  useLayoutEffect(() => {
    if (customFontConfig) {
      setFontConfig(customFontConfig);
      applyFonyAssets(customFontConfig);
    }
  }, [customFontConfig]);
  return [fontConfig, setFontConfig];
};

const applyFonyAssets = (fontConfig) => {
  var newStyle = document.createElement("style");
  newStyle.appendChild(
    document.createTextNode(`
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.semiBoldUrl})
    format("${fontConfig.format}");
  font-weight: ${lightTheme["font-weight-semi-bold"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.lightUrl})
    format("${fontConfig.format}");
  font-weight: ${lightTheme["font-weight-light"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.regularUrl})
    format("${fontConfig.format}");
  font-weight: ${lightTheme["font-weight-regular"]};
  font-style: normal;
}
`)
  );
  newStyle.type = "text/css";
  document.head.appendChild(newStyle);
  document.documentElement.style.setProperty(
    "--font-family-text",
    fontConfig.fontFamilyText
  );
};

export default useFont;
