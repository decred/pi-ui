import React from "react";
import Message from "../Message";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";

describe("Message component", () => {
  test("Matches the snapshot", () => {
    const message = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <Message>test</Message>
      </ThemeProvider>
    );
    expect(message.toJSON()).toMatchSnapshot();
  });
});
