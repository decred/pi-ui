import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import { RadioButtonGroup } from "../RadioButtonGroup";

const options = [
  { label: "foo", value: 1 },
  { label: "bar", value: 2 }
];
describe("RadioButtonGroup component", () => {
  test("Matches snapshot", () => {
    const radiogroup = create(
      <RadioButtonGroup
        label="Test"
        options={options}
        value={1}
        onChange={jest.fn()}
      />
    );
    expect(radiogroup.toJSON()).toMatchSnapshot();
  });

  test("RadioButton click triggers change function and updates value", () => {
    let value = 1;
    const mockHandleChange = jest.fn(() => {
      value = 2;
    });
    const { getByLabelText, queryByLabelText } = render(
      <RadioButtonGroup
        label="Test"
        options={options}
        value={value}
        onChange={mockHandleChange}
      />
    );
    expect(queryByLabelText(/foo/i)).toBeTruthy();
    expect(queryByLabelText(/bar/i)).toBeTruthy();
    fireEvent.click(getByLabelText(/bar/i));
    expect(mockHandleChange).toBeCalled();
    expect(value).toBe(2);
  });
});
