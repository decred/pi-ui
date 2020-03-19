import React from "react";
import DatePicker from "../Datepicker";
import { create } from "react-test-renderer";

describe("DatePicker component", () => {
  test("Matches the snapshot", () => {
    const spinner = create(<DatePicker value={{ year: 2020, month: 12 }} />);
    expect(spinner.toJSON()).toMatchSnapshot();
  });
});
