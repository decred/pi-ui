import { useEffect } from "react";
import {
  useHandleKeyboardHook,
  useHandleKeyboardHookBasicParameters
} from "../hooks";
import { blankValue, matchOption } from "../helpers";

export function useBasicSelect(
  disabled,
  onChange,
  options,
  getOptionLabel,
  optionsFilter,
  value,
  searchable,
  inputValue,
  onInputChange,
  _options,
  setOptions,
  menuOpened,
  focusedOptionIndex,
  setFocusedOptionIndex,
  selectOption
) {
  useEffect(() => {
    let filteredOptions = optionsFilter
      ? options.filter(optionsFilter)
      : options;

    if (searchable && inputValue)
      filteredOptions = matchOption(
        filteredOptions,
        getOptionLabel,
        inputValue
      );
    setOptions(filteredOptions);
  }, [
    searchable,
    inputValue,
    optionsFilter,
    options,
    getOptionLabel,
    setOptions
  ]);

  useEffect(() => {
    if (disabled) return;
    if (optionsFilter && !optionsFilter(value) && getOptionLabel(value))
      onChange(blankValue);
  }, [disabled, value, optionsFilter, onChange, getOptionLabel]);

  const {
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeDefaultHandler
  } = useHandleKeyboardHookBasicParameters(
    menuOpened,
    _options,
    focusedOptionIndex,
    setFocusedOptionIndex,
    inputValue,
    onInputChange,
    searchable
  );

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    selectOption,
    onTypeDefaultHandler
  );
}
