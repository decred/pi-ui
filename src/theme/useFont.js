import { useState, useLayoutEffect } from "react";
import useTheme from "./useTheme";

const useFont = (customFontConfig) => {
  const [fontConfig, setFontConfig] = useState(null);
  const [theme] = useTheme();
  useLayoutEffect(() => {
    if (customFontConfig) {
      setFontConfig(customFontConfig);
      applyFonyAssets(customFontConfig, theme);
    }
  }, [customFontConfig, theme]);
  return [fontConfig, setFontConfig];
};

const applyFonyAssets = (fontConfig, theme) => {
  var newStyle = document.createElement("style");
  newStyle.appendChild(
    document.createTextNode(`
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.semiBoldUrl})
    format("${fontConfig.format}");
  font-weight: ${theme["font-weight-semi-bold"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.lightUrl})
    format("${fontConfig.format}");
  font-weight: ${theme["font-weight-light"]};
  font-style: normal;
}
@font-face {
  font-family: ${fontConfig.fontFamilyText};
  src: url(${fontConfig.regularUrl})
    format("${fontConfig.format}");
  font-weight: ${theme["font-weight-regular"]};
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
