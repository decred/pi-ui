import React from "react";
import TextInput from "../TextInput";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";

describe("TextInput component", () => {
  test("Matches the snapshot", () => {
    const textInput = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <TextInput id="test" />
      </ThemeProvider>
    );
    expect(textInput.toJSON()).toMatchSnapshot();
  });
});
