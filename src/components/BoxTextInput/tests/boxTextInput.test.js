import React from "react";
import BoxTextInput from "../BoxTextInput";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";
import { fireEvent, render } from "@testing-library/react";

describe("BoxTextInput component", () => {
  test("Matches the snapshot", () => {
    const boxTextInputForm = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}
      >
        <BoxTextInput searchInput={true} />
      </ThemeProvider>
    );
    expect(boxTextInputForm.toJSON()).toMatchSnapshot();

    const boxTextInputDefault = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}
      >
        <BoxTextInput />
      </ThemeProvider>
    );
    expect(boxTextInputDefault.toJSON()).toMatchSnapshot();
  });

  test("Calls onSubmit() prop on submit button click", () => {
    const mockedOnSubmit = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}
      >
        <BoxTextInput onSubmit={mockedOnSubmit} searchInput={true} />
      </ThemeProvider>
    );

    // submit button rendered
    expect(queryByTestId("submit-button")).toBeTruthy();

    // click submit button
    fireEvent.click(getByTestId("submit-button"));

    // expect onSubmit to be called
    expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
  });
});
