import React from "react";
import NumberInput from "../NumberInput";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";

describe("NumberInput component", () => {
  test("Matches the snapshot", () => {
    const numberInput = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <NumberInput id="test" />
      </ThemeProvider>
    );
    expect(numberInput.toJSON()).toMatchSnapshot();
  });
});
