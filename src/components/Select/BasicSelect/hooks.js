import { useEffect } from "react";
import { useHandleKeyboardHook } from "../hooks";
import { blankValue, filterByMatchOption } from "../helpers";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";

export function useBasicSelect(
  disabled,
  onChange,
  options,
  getOptionLabel,
  optionsFilter,
  value,
  searchable,
  inputValue,
  setCurrentOptions,
  selectOption,
  onTypeArrowDownHandler,
  onTypeArrowUpHandler,
  onTypeDefaultHandler,
  noOptionsMessage
) {
  useEffect(() => {
    const isMatch = searchable && inputValue;
    filteredOptions = flow([
      filter(optionsFilter),
      filterByMatchOption(getOptionLabel, inputValue, isMatch)
    ])(options);
    const showNoOptionsMessage = noOptionsMessage &&
      (!filteredOptions.length || (searchable && !inputValue));
    if (showNoOptionsMessage)
      filteredOptions = [{
        value: "",
        label: noOptionsMessage,
        onClick: () => { }
      }];
    setCurrentOptions(filteredOptions);
  }, [
    searchable,
    inputValue,
    optionsFilter,
    options,
    getOptionLabel,
    setCurrentOptions
  ]);

  useEffect(() => {
    if (disabled) return;
    if (!optionsFilter(value) && getOptionLabel(value)) onChange(blankValue);
  }, [disabled, value, optionsFilter, onChange, getOptionLabel]);

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    selectOption,
    onTypeDefaultHandler
  );
}
