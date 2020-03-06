import React from "react";
import Toggle from "../Toggle";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";

describe("Toggle Component", () => {
  test("Matches snapshot", () => {
    const toggle = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <Toggle toggled={false} />
      </ThemeProvider>
    );
    expect(toggle.toJSON()).toMatchSnapshot();
  });
});
