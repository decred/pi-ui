import React, {
  useState,
  useLayoutEffect,
  useMemo,
  createContext,
  useContext
} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({
  themes,
  defaultThemeName,
  fontConfig,
  children
}) => {
  const [themeName, setThemeName] = useState(defaultThemeName);
  const theme = useMemo(() => themes[themeName], [themes, themeName]);
  useLayoutEffect(() => {
    if (theme) {
      Object.keys(theme).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      });
      if (fontConfig) {
        applyFontAsset(fontConfig, theme);
      }
    }
  }, [theme, fontConfig]);

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setThemeName,
        theme
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  themes: PropTypes.object.isRequired,
  defaultThemeName: function(props, propName, componentName) {
    const givenThemes = props.themes;
    if (!Object.keys(givenThemes).includes(props[propName])) {
      return new Error(`${propName} must match one of the given themes`);
    }
  },
  fontConfig: PropTypes.object,
  children: PropTypes.node
};

const applyFontAsset = (fontConfig, theme) => {
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
