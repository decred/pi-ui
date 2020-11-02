import React, {
  useState,
  useLayoutEffect,
  useMemo,
  createContext,
  useContext
} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext) || {};

export const ThemeProvider = ({
  themes,
  defaultThemeName,
  fonts,
  children
}) => {
  const [themeName, setThemeName] = useState(defaultThemeName);
  const theme = useMemo(() => themes[themeName], [themes, themeName]);
  useLayoutEffect(() => {
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
    if (fonts) {
      applyFontAsset(fonts);
    }
  }, [theme, fonts]);

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
  defaultThemeName: (props, propName) => {
    const givenThemes = props.themes;
    if (!Object.keys(givenThemes).includes(props[propName])) {
      return new Error(`${propName} must match one of the given themes`);
    }
  },
  fonts: PropTypes.array,
  children: PropTypes.node
};

const applyFontAsset = (fonts) => {
  const newStyle = document.createElement("style");
  fonts.forEach((fontFace) => {
    let fontFaceStr = "";
    for (const [key, value] of Object.entries(fontFace)) {
      fontFaceStr = `${fontFaceStr}
        ${key}: ${value};
      `;
    }
    const fontFaceNode = document.createTextNode(`
    @font-face {
      ${fontFaceStr}
    }
    `);
    newStyle.appendChild(fontFaceNode);
  });
  newStyle.type = "text/css";
  document.head.appendChild(newStyle);
};
