import React from "react";
import Button from "../Button";
import { create } from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button>test</Button>);
    expect(button.toJSON()).toMatchSnapshot();
  });

  test("Calls onSubmit() prop on submit button click", () => {
    const mockedOnClick = jest.fn();

    const { getByText, queryByText } = render(
      <Button onClick={mockedOnClick}>test</Button>
    );

    // button rendered with right children
    expect(queryByText("test")).toBeTruthy();

    // click button
    fireEvent.click(getByText("test"));

    // expect click cb to be called
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});
