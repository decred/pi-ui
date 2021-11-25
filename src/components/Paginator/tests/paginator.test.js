import React from "react";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import Paginator from "../Paginator";
import {
  defaultLightTheme,
  ThemeProvider,
  DEFAULT_LIGHT_THEME_NAME,
} from "../../../theme";

const getPreviousPageButton = () =>
  screen.getByRole("button", { name: "Previous page" });
const getNextPageButton = () =>
  screen.getByRole("button", { name: "Next page" });
const clickOnPageButton = (index) =>
  fireEvent.click(screen.getByRole("button", { name: `${index}` }));
const checkPageButtons = (expectedSelectedPage, expectedButtons) => {
  const renderedButtons = screen.getAllByRole("button");
  expect(renderedButtons[0].parentNode.textContent).toBe(expectedButtons);

  renderedButtons.forEach((item, i) => {
    if (i == 0) {
      // previousPage button
      expect(item.disabled).toBe(expectedSelectedPage === 1);
    } else if (i == renderedButtons.length - 1) {
      // nextPage button
      expect(item.disabled).toBe(
        expectedButtons.endsWith(expectedSelectedPage)
      );
    } else {
      expect(item.disabled).toBe(
        item.textContent === `${expectedSelectedPage}`
      );
    }
  });
};

const mockOnChangePage = jest.fn(() => {});

const render = (ui) =>
  rtlRender(
    <ThemeProvider
      themes={{ [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme }}
      defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
      {ui}
    </ThemeProvider>
  );

const checkNotCollapsablePagination = (pageCount) => {
  render(<Paginator pageCount={pageCount} />);
  const nextPageButton = getNextPageButton();
  const expectedButtons = [...Array(pageCount).keys()]
    .map((_, i) => i + 1)
    .join("");

  for (let i = 1; i <= pageCount; i++) {
    checkPageButtons(i, expectedButtons);
    fireEvent.click(nextPageButton);
  }
};

describe("Paginator component", () => {
  test("render a 1-page length Paginator component", () => {
    render(<Paginator pageCount={1} />);
    expect(getNextPageButton().disabled).toBeTruthy();
    expect(getPreviousPageButton().disabled).toBeTruthy();
    // init (1)
    checkPageButtons(1, "1");
  });

  test("render a 2-page length Paginator component", () => {
    render(<Paginator pageCount={2} onPageChange={mockOnChangePage} />);
    const nextPageButton = getNextPageButton();
    const previousPageButton = getPreviousPageButton();
    // init (1)
    checkPageButtons(1, "12");
    // 2
    fireEvent.click(nextPageButton);
    checkPageButtons(2, "12");
    expect(mockOnChangePage).toHaveBeenCalledWith({ selected: 1 });
    // back to 1
    fireEvent.click(previousPageButton);
    checkPageButtons(1, "12");
    expect(mockOnChangePage).toHaveBeenCalledWith({ selected: 0 });
  });

  test("render a 3-page length Paginator component", () => {
    checkNotCollapsablePagination(3);
  });

  test("render a 7-page length Paginator component", () => {
    checkNotCollapsablePagination(7);
  });

  test("render a 8-page length Paginator component", () => {
    checkNotCollapsablePagination(8);
  });

  test("render a 10-page length Paginator component", () => {
    render(<Paginator pageCount={10} />);
    const nextPageButton = getNextPageButton();
    // init (1)
    checkPageButtons(1, "1234567...10");
    // 2
    fireEvent.click(nextPageButton);
    checkPageButtons(2, "1234567...10");
    // 3
    fireEvent.click(nextPageButton);
    checkPageButtons(3, "1234567...10");
    // 4
    fireEvent.click(nextPageButton);
    checkPageButtons(4, "1234567...10");
    // 5
    fireEvent.click(nextPageButton);
    checkPageButtons(5, "1...34567...10");
    // 6
    clickOnPageButton(6);
    checkPageButtons(6, "1...45678...10");
    // 7
    clickOnPageButton(7);
    checkPageButtons(7, "1...45678910");
    // 8
    clickOnPageButton(8);
    checkPageButtons(8, "1...45678910");
    // 9
    clickOnPageButton(9);
    checkPageButtons(9, "1...45678910");
    // 10
    clickOnPageButton(10);
    checkPageButtons(10, "1...45678910");
  });

  test("render a 20-page length Paginator component, clicking on the brake buttons", () => {
    render(
      <Paginator pageCount={20} paginationGap={3} marginPagesDisplayed={2} />
    );
    // init (1)
    checkPageButtons(1, "12345678910...1920");
    // 7
    fireEvent.click(screen.getByRole("button", { name: "..." }));
    checkPageButtons(7, "12...45678910...1920");
    // 13
    fireEvent.click(screen.getAllByRole("button", { name: "..." })[1]);
    checkPageButtons(13, "12...10111213141516...1920");
    // 19
    fireEvent.click(screen.getAllByRole("button", { name: "..." })[1]);
    checkPageButtons(19, "12...11121314151617181920");
    // go back to 13
    fireEvent.click(screen.getByRole("button", { name: "..." }));
    checkPageButtons(13, "12...10111213141516...1920");
  });
});
