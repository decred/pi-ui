import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import Table from "../Table";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME
} from "../../../theme";

const mockData = [
  {
    Test1: "testl1c1",
    Test2: "testl1c2"
  },
  {
    Test1: "testl2c1",
    Test2: "testl2c2"
  }
];

const mockHeaders = Object.keys(mockData[0]);

describe("Table Component", () => {
  test("Matches the snapshot", () => {
    const table = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <Table data={mockData} headers={mockHeaders} />
      </ThemeProvider>
    );
    expect(table.toJSON()).toMatchSnapshot();
  });

  test("Table pagination", () => {
    const { getByTestId, queryByText, queryByTestId } = render(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
        <Table linesPerPage={1} data={mockData} headers={mockHeaders} />
      </ThemeProvider>
    );

    let line1column1 = queryByText("testl1c1");
    let line2column1 = queryByText("testl2c1");
    const back = queryByTestId("back");
    const next = queryByTestId("next");

    expect(line1column1).toBeTruthy();
    expect(line2column1).toBeFalsy();
    expect(back).toBeTruthy();
    expect(next).toBeTruthy();

    // nothing happens
    fireEvent.click(getByTestId("back"));
    line2column1 = queryByText("testl2c1");
    expect(line2column1).toBeFalsy();

    // next
    fireEvent.click(getByTestId("next"));
    line1column1 = queryByText("testl1c1");
    line2column1 = queryByText("testl2c1");
    expect(line2column1).toBeTruthy();
    expect(line1column1).toBeFalsy();

    // back
    fireEvent.click(getByTestId("back"));
    line1column1 = queryByText("testl1c1");
    line2column1 = queryByText("testl2c1");
    expect(line2column1).toBeFalsy();
    expect(line1column1).toBeTruthy();
  });
});
