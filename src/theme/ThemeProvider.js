import React, { useState, useCallback, useLayoutEffect } from "react";
import PropTypes from "prop-types";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ themes, defaultThemeName, children }) => {
  const [themeName, setThemeName] = useState(defaultThemeName);
  const updateTheme = useCallback((newThemeName) => {
    setThemeName(newThemeName);
  });

  useLayoutEffect(() => {
    if (themeName & themes) {
      const cssVars = themes[themeName];
      Object.keys(cssVars).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, cssVars[key]);
      });
    }
  }, [themeName, themes]);

  return (
    <ThemeContext.Provider
      value={{
        useThemeName: [themeName, setThemeName],
        themes,
        updateTheme
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  themes: PropTypes.object.isRequired,
  defaultThemeName: PropTypes.string.isRequired,
  children: PropTypes.node
};
