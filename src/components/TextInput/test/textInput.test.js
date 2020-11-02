import React from "react";
import TextInput from "../TextInput";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME
} from "../../../theme";

describe("TextInput component", () => {
  test("Matches the snapshot", () => {
    const textInput = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <TextInput id="test" />
      </ThemeProvider>
    );
    expect(textInput.toJSON()).toMatchSnapshot();
  });
});
