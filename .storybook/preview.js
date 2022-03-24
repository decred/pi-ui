import { addDecorator } from "@storybook/react";
import themeDecorator from "./themeDecorator";
import { withThemes } from "@react-theming/storybook-addon";
import {
  DEFAULT_DARK_THEME_NAME,
  DEFAULT_LIGHT_THEME_NAME,
  defaultDarkTheme,
  defaultLightTheme,
} from "../src/theme";
import providerFn from "./providerFn";

const themes = [
  { [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme },
  { [DEFAULT_DARK_THEME_NAME]: defaultDarkTheme },
];

addDecorator(
  withThemes(null, themes, {
    providerFn,
  })
);

export const parameters = {
  backgrounds: { disable: true },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
