import React, { useEffect } from "react";
import {
  useTheme,
  ThemeProvider,
  DEFAULT_DARK_THEME_NAME,
  DEFAULT_LIGHT_THEME_NAME,
  defaultDarkTheme,
  defaultLightTheme,
} from "../src/theme";

const themes = {
  [DEFAULT_DARK_THEME_NAME]: defaultDarkTheme,
  [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme,
};

function ThemeConsumer({ theme, children }) {
  const { setThemeName, themeName } = useTheme();
  const themeKey = Object.keys(theme)[0];
  useEffect(() => {
    if (themeName !== themeKey) {
      setThemeName(themeKey);
    }
  }, [themeKey, setThemeName, themeName]);

  return children;
}

function providerFn({ theme, children }) {
  return (
    <ThemeProvider themes={themes} defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
      <ThemeConsumer theme={theme}>{children}</ThemeConsumer>
    </ThemeProvider>
  );
}

export default providerFn;
