import React from "react";
import CopyableText from "../CopyableText";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";

describe("CopyableText component", () => {
  test("Matches snapshot", () => {
    const copyableText = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <CopyableText id="copy-id">test</CopyableText>
      </ThemeProvider>
    );
    expect(copyableText.toJSON()).toMatchSnapshot();
  });
});
