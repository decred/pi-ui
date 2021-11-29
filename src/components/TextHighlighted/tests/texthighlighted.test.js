import React from "react";
import TextHighlighted from "../TextHighlighted";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";

describe("TextHighlighted component", () => {
  test("Matches snapshot", () => {
    const texthighlighted = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <TextHighlighted id="text-id">test</TextHighlighted>
      </ThemeProvider>
    );
    expect(texthighlighted.toJSON()).toMatchSnapshot();
  });
});
