import React from "react";
import StatusBar from "../StatusBar";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";

describe("StatusBar component", () => {
  test("Matches the snapshot", () => {
    const statusBar = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}
      >
        <StatusBar
          status={[
            {
              label: "Yes",
              amount: 300,
              color: "green",
            },
            {
              label: "No",
              amount: 200,
              color: "orange",
            },
          ]}
        />
      </ThemeProvider>
    );
    expect(statusBar.toJSON()).toMatchSnapshot();
  });
});
