import React from "react";
import CopyableText from "../CopyableText";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";

describe("CopyableText component", () => {
  test("Matches snapshot", () => {
    const copyableText = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <CopyableText id="copy-id">test</CopyableText>
      </ThemeProvider>
    );
    expect(copyableText.toJSON()).toMatchSnapshot();
  });
});
