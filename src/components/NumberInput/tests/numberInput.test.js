import React from "react";
import NumberInput from "../NumberInput";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";

describe("NumberInput component", () => {
  test("Matches the snapshot", () => {
    const numberInput = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <NumberInput id="test" />
      </ThemeProvider>
    );
    expect(numberInput.toJSON()).toMatchSnapshot();
  });
});
