import React from "react";
import TextArea from "../TextArea";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";

describe("TextArea component", () => {
  test("Matches the snapshot", () => {
    const textArea = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <TextArea id="test" />
      </ThemeProvider>
    );
    expect(textArea.toJSON()).toMatchSnapshot();
  });
});
