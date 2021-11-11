import React from "react";
import Dropdown from "../Dropdown";
import DropdownItem from "../DropdownItem";
import { create } from "react-test-renderer";
import { fireEvent, render, wait } from "@testing-library/react";

describe("Dropdown component", () => {
  test("Matches snapshot", () => {
    const dropdown = create(
      <Dropdown title="test">
        <DropdownItem>test1</DropdownItem>
        <DropdownItem>test2</DropdownItem>
      </Dropdown>
    );
    expect(dropdown.toJSON()).toMatchSnapshot();
  });
  test("Items list show on click", async () => {
    const itemMockClick = jest.fn();
    const { getByTestId, queryByTestId, getByText, queryByText } = render(
      <Dropdown title="test">
        <DropdownItem onClick={itemMockClick}>test1</DropdownItem>
        <DropdownItem>test2</DropdownItem>
      </Dropdown>
    );
    const trigger = queryByTestId("trigger");
    const itemsList = queryByTestId("items-list");
    expect(trigger).toBeTruthy();
    expect(itemsList).toBeFalsy();
    fireEvent.click(getByTestId("trigger"));
    const updatedItemsList = queryByTestId("items-list");
    expect(updatedItemsList).toBeTruthy();
    const dropdownItem = queryByText(/test1/i);
    expect(dropdownItem).toBeTruthy();
    fireEvent.click(getByText("test1"));
    expect(itemMockClick).toBeCalled();
    const afterClickItemsList = queryByTestId("items-list");
    expect(afterClickItemsList).toBeFalsy();
  });
});
