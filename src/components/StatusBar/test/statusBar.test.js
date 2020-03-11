import React from "react";
import StatusBar from "../StatusBar";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";

describe("StatusBar component", () => {
  test("Matches the snapshot", () => {
    const statusBar = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <StatusBar
          status={[
            {
              label: "Yes",
              amount: 300,
              color: "green"
            },
            {
              label: "No",
              amount: 200,
              color: "orange"
            }
          ]}
        />
      </ThemeProvider>
    );
    expect(statusBar.toJSON()).toMatchSnapshot();
  });
});
