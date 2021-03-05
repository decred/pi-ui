import { useEffect } from "react";
import { useHandleKeyboardHook } from "../hooks";
import { filterByMatchOption } from "../helpers";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import differenceWith from "lodash/differenceWith";
import identity from "lodash/fp/identity";
import isEqual from "lodash/isEqual";

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
  onTypeDefaultHandler,
  noOptionsMessage,
  hideSelected
) {
  useEffect(() => {
    const isMatch = searchable && inputValue;
    let filteredOptions = flow([
      filter(optionsFilter),
      filterByMatchOption(getOptionLabel, inputValue, isMatch),
      hideSelected ? (opt) => differenceWith(opt, value, isEqual) : identity
    ])(options);
    const showNoOptionsMessage =
      noOptionsMessage &&
      (!filteredOptions.length || (searchable && !inputValue));
    if (showNoOptionsMessage !== false)
      filteredOptions = [
        {
          value: "",
          label: noOptionsMessage,
          selectable: false,
          onClick: () => { }
        }
      ];
    setCurrentOptions(filteredOptions);
  }, [
    searchable,
    getOptionLabel,
    inputValue,
    hideSelected,
    value,
    optionsFilter,
    options,
    setCurrentOptions,
    noOptionsMessage
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
