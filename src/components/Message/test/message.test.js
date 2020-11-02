import React from "react";
import Message from "../Message";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME
} from "../../../theme";

describe("Message component", () => {
  test("Matches the snapshot", () => {
    const message = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <Message>test</Message>
      </ThemeProvider>
    );
    expect(message.toJSON()).toMatchSnapshot();
  });
});
