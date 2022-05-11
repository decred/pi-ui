import React from "react";
import DatePicker from "../Datepickerv2";
import { render, screen } from "@testing-library/react";

describe("Given DatePickerV2 component", () => {
  const date = new Date();
  describe("when props are default", () => {
    it("should render date pads correctly", () => {
      render(<DatePicker />);
      screen.getByText(/pick a date/i).click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear()}`);
      expect(
        screen.getByTestId("datepicker-pad-month-label").textContent
      ).toEqual(`${date.getMonth() + 1}`);
    });
  });
  describe("when max date is reached", () => {
    it("should not display next (>) arrows", () => {
      render(<DatePicker maxTimestamp={Date.now() + 10000} />);
      screen.getByText(/pick a date/i).click();
      expect(screen.getAllByDisplayValue(">")[0].className).toContain(
        "disabled"
      );
      expect(screen.getAllByDisplayValue(">")[1].className).toContain(
        "disabled"
      );
    });
  });
  describe("when min date is reached", () => {
    it("should not display previous (<) arrows", () => {
      render(<DatePicker minTimestamp={Date.now()} />);
      screen.getByText(/pick a date/i).click();
      expect(screen.getAllByDisplayValue("<")[0].className).toContain(
        "disabled"
      );
      expect(screen.getAllByDisplayValue("<")[1].className).toContain(
        "disabled"
      );
    });
  });
  describe("when pressing next year arrow", () => {
    it("should change year", () => {
      render(<DatePicker />);
      screen.getByText(/pick a date/i).click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear()}`);
      screen.getAllByDisplayValue(">")[0].click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear() + 1}`);
    });
    it("should change year and move to max month if target month is greater than allowed", () => {
      // one year from now
      const max = new Date(
        new Date().setFullYear(date.getFullYear() + 1)
      ).getTime();
      render(<DatePicker maxTimestamp={max} />);
      screen.getByText(/pick a date/i).click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear()}`);
      screen.getAllByDisplayValue(">")[1].click();
      screen.getAllByDisplayValue(">")[0].click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear() + 1}`);
      expect(
        screen.getByTestId("datepicker-pad-month-label").textContent
      ).toEqual(`${date.getMonth() + 1}`);
    });
  });
  describe("when pressing previous year arrow", () => {
    // previous year
    const min = new Date(
      new Date().setFullYear(date.getFullYear() - 1)
    ).getTime();
    it("should change year", () => {
      render(<DatePicker minTimestamp={min} />);
      screen.getByText(/pick a date/i).click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear()}`);
      screen.getAllByDisplayValue("<")[0].click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear() - 1}`);
    });
    it("should change year and move to min month if target month is less than allowed", () => {
      render(<DatePicker minTimestamp={min} />);
      screen.getByText(/pick a date/i).click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear()}`);
      screen.getAllByDisplayValue("<")[1].click();
      screen.getAllByDisplayValue("<")[0].click();
      expect(
        screen.getByTestId("datepicker-pad-year-label").textContent
      ).toEqual(`${date.getFullYear() - 1}`);
      expect(
        screen.getByTestId("datepicker-pad-month-label").textContent
      ).toEqual(`${date.getMonth() + 1}`);
    });
  });
});
