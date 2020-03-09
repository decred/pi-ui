import React from "react";
import { create } from "react-test-renderer";
import { defaultLightTheme, ThemeProvider } from "../../../theme";
import { render, fireEvent } from "@testing-library/react";
import Tabs from "../Tabs";
import Tab from "../Tab";

describe("Tabs Component", () => {
  test("Matches the snapshot", () => {
    const tabs = create(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <Tabs onSelectTab={jest.fn()} activeTabIndex={0}>
          <Tab label="tab1" count={1}>
            <div>test1</div>
          </Tab>
          <Tab label="tab2" count={4}>
            <div>test2</div>
          </Tab>
        </Tabs>
      </ThemeProvider>
    );
    expect(tabs.toJSON()).toMatchSnapshot();
  });

  test("Changing tabs works properly", () => {
    let activeTabIndex = 0;
    const mockHandleSelectTab = jest.fn(() => {
      activeTabIndex = 1;
    });
    const { getByTestId, queryByText, rerender } = render(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <Tabs onSelectTab={mockHandleSelectTab} activeTabIndex={activeTabIndex}>
          <Tab label="tab1" count={1}>
            <div>test1</div>
          </Tab>
          <Tab label="tab2" count={4}>
            <div>test2</div>
          </Tab>
        </Tabs>
      </ThemeProvider>
    );
    expect(queryByText(/test1/i)).toBeTruthy();
    expect(queryByText(/test2/i)).toBeFalsy();
    fireEvent.click(getByTestId("tab-1"));
    expect(mockHandleSelectTab).toBeCalled();
    rerender(
      <ThemeProvider
        themes={{ light: defaultLightTheme }}
        defaultThemeName="light">
        <Tabs onSelectTab={mockHandleSelectTab} activeTabIndex={activeTabIndex}>
          <Tab label="tab1" count={1}>
            <div>test1</div>
          </Tab>
          <Tab label="tab2" count={4}>
            <div>test2</div>
          </Tab>
        </Tabs>
      </ThemeProvider>
    );
    expect(queryByText(/test1/i)).toBeFalsy();
    expect(queryByText(/test2/i)).toBeTruthy();
  });
});
