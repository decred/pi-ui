import React from "react";
import {
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

const ThemeDecorator = (storyFn) => (
  <ThemeProvider themes={themes} defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
    {storyFn()}
  </ThemeProvider>
);

export default ThemeDecorator;
