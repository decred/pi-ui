import { useEffect } from "react";
import { useHandleKeyboardHook } from "../hooks";
import { blankValue, matchOption } from "../helpers";
import flow from "lodash/flow";
import filter from "lodash/filter";
import identity from "lodash/identity";

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
    inputValue,
    optionsFilter,
    options,
    getOptionLabel,
    setCurrentOptions
  ]);

  useEffect(() => {
    if (disabled) return;
    if (optionsFilter && !optionsFilter(value) && getOptionLabel(value))
      onChange(blankValue);
  }, [disabled, value, optionsFilter, onChange, getOptionLabel]);

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    selectOption,
    onTypeDefaultHandler
  );
}
