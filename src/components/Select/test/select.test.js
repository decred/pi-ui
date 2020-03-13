import React from "react";
import Select from "../Select";
import { create } from "react-test-renderer";
import { render } from "@testing-library/react";
import selectEvent from "react-select-event";

describe("Select component", () => {
  test("Matches the snapshot", () => {
    const props = [
      {
        value: "top",
        label: "Top"
      }
    ];
    const select = create(<Select options={props} />);
    expect(select.toJSON()).toMatchSnapshot();
  });

  test("Call on change function on option click", async () => {
    const options = [
      {
        value: "top",
        label: "Top"
      }
    ];
    let selected;
    const mockHandleChange = jest.fn((option) => {
      selected = option.value;
    });
    const { getByLabelText } = render(
      <>
        <label htmlFor="sort">Sort</label>
        <Select options={options} onChange={mockHandleChange} inputId="sort" />
      </>
    );

    // select top option
    await selectEvent.select(getByLabelText("Sort"), ["Top"]);
    expect(mockHandleChange).toBeCalled();
    expect(selected).toBe("top");
  });
});
