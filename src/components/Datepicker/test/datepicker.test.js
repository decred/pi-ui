import React from "react";
import DatePicker from "../Datepicker";
import { create } from "react-test-renderer";
import { render } from "@testing-library/react";

describe("DatePicker component", () => {
  test("Matches the snapshot", () => {
    const datePicker = create(<DatePicker value={{ year: 2020, month: 12 }} />);
    expect(datePicker.toJSON()).toMatchSnapshot();
  });

  test("lang prop values are used as months", () => {
    const years = {
      min: { year: 2018, month: 1, day: 25 },
      max: { year: 2020, month: 2, day: 4 },
    };
    const monthsTranslations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const { queryByText, rerender, unmount } = render(
      <DatePicker
        lang={monthsTranslations}
        years={years}
        value={{ year: 2019, month: 11, day: 15 }}
        show={true}>
        <></>
      </DatePicker>
    );
    // Selected value is 15.11.2019 => Nov month is displayed.
    expect(queryByText(/Nov/i)).toBeTruthy();
    unmount();
    rerender(
      <DatePicker
        lang={monthsTranslations}
        years={years}
        value={{ year: 2019, month: 12, day: 15 }}
        show={true}>
        <></>
      </DatePicker>
    );
    // Selected value is 15.12.2019 => Nov month is displayed.
    expect(queryByText(/Dec/i)).toBeTruthy();
  });
});
