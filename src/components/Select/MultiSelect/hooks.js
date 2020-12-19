import { useEffect } from "react";
import { usePrevious } from "hooks";
import { useHandleKeyboardHook } from "../hooks";
import { matchOption } from "../helpers";
import flow from "lodash/flow";
import filter from "lodash/filter";
import identity from "lodash/identity";

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
    const filteredOptions = flow([
      searchable && inputValue
        ? filter(matchOption(getOptionLabel, inputValue))
        : identity,
      optionsFilter ? filter(optionsFilter) : identity
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

  const previousSelectedOptions = usePrevious(value);

  useEffect(() => {
    if (disabled) return;
    if (optionsFilter && previousSelectedOptions !== value && value.length)
      onChange(value.filter(optionsFilter));
  }, [disabled, value, optionsFilter, previousSelectedOptions, onChange]);

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
