import React from "react";
import Toggle from "../Toggle";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME
} from "../../../theme";
import { render, fireEvent } from "@testing-library/react";

describe("Toggle Component", () => {
  test("Matches snapshot", () => {
    const toggle = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <Toggle toggled={false} />
      </ThemeProvider>
    );
    expect(toggle.toJSON()).toMatchSnapshot();
  });

  test("Toggles state", () => {
    const mockHandleToggle = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <Toggle toggled={false} onToggle={mockHandleToggle} />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId("switch"));
    expect(mockHandleToggle).toBeCalled();
  });
});
