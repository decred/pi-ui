import { addDecorator } from "@storybook/react";
import themeDecorator from "./themeDecorator";

addDecorator(themeDecorator);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
