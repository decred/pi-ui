import React from "react";
import Badge from "../Badge";
import { create } from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";

describe("Badge component", () => {
  test("Matches the snapshot", () => {
    const badge = create(
      <Badge show={true} onClose={jest.fn()}>
        test
      </Badge>
    );
    expect(badge.toJSON()).toMatchSnapshot();
  });

  test("Calls onClose() prop on close icon click", () => {
    const mockedOnClose = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <Badge show={true} onClose={mockedOnClose}>
        test
      </Badge>
    );

    // close button rendered
    expect(queryByTestId("close-button")).toBeTruthy();

    // click close button
    fireEvent.click(getByTestId("close-button"));

    // expect onClose to be called
    expect(mockedOnClose).toHaveBeenCalledTimes(1);
  });
});
