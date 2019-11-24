import { useState, useLayoutEffect, useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const useFont = (customFontConfig) => {
  const [fontConfig, setFontConfig] = useState(null);
  const { themes, useThemeName } = useContext(ThemeContext);
  const [themeName] = useThemeName;
  const currentTheme = themes && themeName && themes[themeName];
  useLayoutEffect(() => {
    if (customFontConfig && currentTheme) {
      setFontConfig(customFontConfig);
      applyFonyAssets(customFontConfig, currentTheme);
    }
  }, [customFontConfig, currentTheme]);
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
