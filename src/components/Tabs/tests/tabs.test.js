import React from "react";
import { create } from "react-test-renderer";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Tabs from "../Tabs";
import Tab from "../Tab";

describe("Tabs Component", () => {
  test("Matches the snapshot", () => {
    const tabs = create(
      <ThemeProvider
        themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
        defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
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

  test("Changing tabs works properly", async () => {
    // create TabsContainer helper component to be able
    // to serve activeTabIndex state parameter to Tabs
    const TabsContainer = () => {
      const [activeTabIndex, setActiveTabIndex] = React.useState(0);

      return (
        <ThemeProvider
          themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
          defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
          <Tabs onSelectTab={setActiveTabIndex} activeTabIndex={activeTabIndex}>
            <Tab label="tab1" count={1}>
              <div>test1</div>
            </Tab>
            <Tab label="tab2" count={4}>
              <div>test2</div>
            </Tab>
          </Tabs>
        </ThemeProvider>
      );
    };
    const { getByTestId, queryByText, getByText, queryAllByText } = render(
      <TabsContainer />
    );
    expect(queryByText(/test1/i)).toBeTruthy();
    expect(queryByText(/test2/i)).toBeFalsy();
    fireEvent.click(getByTestId("tab-1"));

    // wait until `test2` content appears entirely
    await waitFor(() =>
      expect(getByText("test2").parentNode.style.opacity).toBe("1")
    );
    expect(queryByText(/test1/i)).toBeFalsy();
    expect(queryAllByText(/test2/i)).toBeTruthy();
  });
});
