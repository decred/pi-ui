import React, { useState, useLayoutEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({
  themes,
  defaultThemeName,
  fontConfig,
  children
}) => {
  const [themeName, setThemeName] = useState(defaultThemeName);
  const currentTheme = useMemo(() => themes[themeName], [themes, themeName]);
  useLayoutEffect(() => {
    if (currentTheme) {
      Object.keys(currentTheme).forEach((key) => {
        document.documentElement.style.setProperty(
          `--${key}`,
          currentTheme[key]
        );
      });
      if (fontConfig) {
        applyFonyAssets(fontConfig, currentTheme);
      }
    }
  }, [currentTheme, fontConfig]);

  return (
    <ThemeContext.Provider
      value={{
        useThemeName: [themeName, setThemeName],
        currentTheme
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  themes: PropTypes.object.isRequired,
  defaultThemeName: PropTypes.string.isRequired,
  fontConfig: PropTypes.object,
  children: PropTypes.node
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
