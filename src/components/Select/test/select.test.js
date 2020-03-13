import React from "react";
import Select from "../Select";
import { create } from "react-test-renderer";
import { render } from "@testing-library/react";
import selectEvent from "react-select-event";

describe("Select component", () => {
  const options = [
    {
      value: "top",
      label: "Top"
    }
  ];
  test("Matches the snapshot", () => {
    const select = create(<Select options={options} />);
    expect(select.toJSON()).toMatchSnapshot();
  });

  test("Call on change function on option click", async () => {
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
