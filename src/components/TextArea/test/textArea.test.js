import React from "react";
import TextArea from "../TextArea";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";

describe("TextArea component", () => {
  test("Matches the snapshot", () => {
    const textArea = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <TextArea id="test" />
      </ThemeProvider>
    );
    expect(textArea.toJSON()).toMatchSnapshot();
  });
});
