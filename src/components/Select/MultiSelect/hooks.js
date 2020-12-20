import { useEffect } from "react";
import { useHandleKeyboardHook } from "../hooks";
import { filterByMatchOption } from "../helpers";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";

export function useMultiSelect(
  disabled,
  onChange,
  options,
  getOptionLabel,
  optionsFilter,
  searchable,
  value,
  inputValue,
  setCurrentOptions,
  selectOption,
  resetMenu,
  removeSelectedOptionFilter,
  onTypeArrowDownHandler,
  onTypeArrowUpHandler,
  onTypeDefaultHandler
) {
  useEffect(() => {
    const isMatch = searchable && inputValue;

    const filteredOptions = flow([
      filter(optionsFilter),
      filterByMatchOption(getOptionLabel, inputValue, isMatch)
    ])(options);

    setCurrentOptions(filteredOptions);
  }, [
    searchable,
    getOptionLabel,
    inputValue,
    optionsFilter,
    options,
    setCurrentOptions
  ]);

  useEffect(() => {
    if (disabled) return;
    const filteredOptions = value.filter(optionsFilter);
    if (filteredOptions.length !== value.length) onChange(filteredOptions);
  }, [disabled, value, optionsFilter, onChange]);

  const removeSelectedOption = (e, option) => {
    onChange(removeSelectedOptionFilter(option));
    e.stopPropagation();
  };

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    selectOption,
    onTypeDefaultHandler
  );

  const cancelSelection = (e) => {
    if (disabled) return;
    onChange([]);
    resetMenu();
    e.stopPropagation();
  };

  return {
    cancelSelection,
    removeSelectedOption
  };
}
