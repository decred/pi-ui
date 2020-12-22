import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Select, MultiSelect, AsyncSelect, Creatable } from "../index";

const options = [
  {
    value: "top",
    label: "Top"
  },
  {
    value: "new",
    label: "New"
  },
  {
    value: "old",
    label: "Old"
  }
];
const value = {
  value: "new",
  label: "New"
};
describe("Select components", () => {
  test("Basic expanded select snapshot", () => {
    const itemMockClick = jest.fn();
    const { container, getByTestId } = render(
      <Select
        options={options}
        value={value}
        onChange={itemMockClick}
        label="Basic select"
      />
    );
    const controls = getByTestId("select-controls");
    fireEvent.click(controls);
    expect(container).toMatchSnapshot();
  });

  test("Basic select response to click on first option", () => {
    const itemMockClick = jest.fn();
    const { getByTestId, getByText } = render(
      <Select
        options={options}
        value={value}
        onChange={itemMockClick}
        label="Basic select"
      />
    );
    fireEvent.click(getByTestId("select-controls"));
    fireEvent.click(getByText("Old"));
    expect(itemMockClick).toHaveBeenCalledTimes(1);
  });

  test("Multi select response to click on all options", () => {
    const itemMockClick = jest.fn();
    const { getByTestId, getByText } = render(
      <MultiSelect
        options={options}
        value={[]}
        onChange={itemMockClick}
        label="Multi select"
      />
    );
    fireEvent.click(getByTestId("select-controls"));
    options.forEach((option) => fireEvent.click(getByText(option.label)));
    expect(itemMockClick).toHaveBeenCalledTimes(options.length);
  });

  test("Async select response to search for loaded option", async () => {
    const itemMockClick = jest.fn();
    const itemMockInputChange = jest.fn();
    const loadedOptions = [{ label: "Async select test", value: "" }];
    const optionsFilter = (input) =>
      loadedOptions.filter((loadedOption) =>
        loadedOption.label.toLowerCase().includes(input.toLowerCase())
      );
    const promiseOptions = (input) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(optionsFilter(input)), 100)
      );
    const { getByText, getByTestId, rerender } = render(
      <AsyncSelect
        options={options}
        value={value}
        onChange={itemMockClick}
        inputValue=""
        onInputChange={itemMockInputChange}
        loadOptions={promiseOptions}
        label="Async select"
      />
    );
    fireEvent.click(getByTestId("select-controls"));
    fireEvent.keyDown(getByTestId("select-controls"), { keyCode: 65 });
    expect(itemMockInputChange).toHaveBeenCalledTimes(1);
    rerender(
      <AsyncSelect
        options={options}
        value={value}
        onChange={itemMockClick}
        inputValue="A"
        onInputChange={itemMockInputChange}
        loadOptions={promiseOptions}
        label="Async select"
      />
    );
    expect(itemMockInputChange).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 100));
    fireEvent.click(getByText("Async select test"));
    expect(itemMockClick).toHaveBeenCalledTimes(1);
  }, 2000);

  test("Creatable select response to creation of new option", () => {
    const typeLabel = "Just type to add a new option";
    const createOption = "My new option";
    const itemMockClick = jest.fn();
    const itemMockInputChange = jest.fn();
    const isValidNewOption = () => true;
    const newOptionCreator = jest.fn();
    const promptTextCreator = (newOption) => `Add ${newOption}`;
    const { getByTestId, getByText, rerender } = render(
      <Creatable
        options={options}
        inputValue=""
        onInputChange={itemMockInputChange}
        onChange={itemMockClick}
        value={value}
        label="Creatable"
        typeLabel={typeLabel}
        isValidNewOption={isValidNewOption}
        newOptionCreator={newOptionCreator}
        promptTextCreator={promptTextCreator}
      />
    );
    fireEvent.click(getByTestId("select-controls"));
    fireEvent.click(getByText(typeLabel));
    expect(itemMockClick).toHaveBeenCalledTimes(0);
    expect(itemMockInputChange).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(getByTestId("select-controls"), { keyCode: 74 });
    expect(itemMockInputChange).toHaveBeenCalledTimes(1);
    rerender(
      <Creatable
        options={options}
        inputValue={createOption}
        onInputChange={itemMockInputChange}
        onChange={itemMockClick}
        value={value}
        label="Creatable"
        typeLabel={typeLabel}
        isValidNewOption={isValidNewOption}
        newOptionCreator={newOptionCreator}
        promptTextCreator={promptTextCreator}
      />
    );
    fireEvent.click(getByText(promptTextCreator(createOption)));
    expect(itemMockClick).toHaveBeenCalledTimes(1);
    expect(itemMockInputChange).toHaveBeenCalledTimes(1);
  });
});
