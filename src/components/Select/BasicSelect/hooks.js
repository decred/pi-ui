import { useState, useEffect } from "react";
import {
  useHandleKeyboardHook,
  useHandleKeyboardHookBasicParameters,
  useSelect
} from "../hooks";
import { blankValue, matchOption, findExact } from "../helpers";

export function useBasicSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  optionsFilter,
  value,
  searchable,
  inputValue,
  onInputChange
) {
  const [_options, setOptions] = useState([]);

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
  }, [searchable, inputValue, optionsFilter, options, getOptionLabel]);

  useEffect(() => {
    if (disabled) return;
    if (optionsFilter && !optionsFilter(value) && getOptionLabel(value))
      onChange(blankValue);
  }, [disabled, value, optionsFilter, onChange, getOptionLabel]);

  const setOption = (option, knownIndex) => {
    const index =
      knownIndex || findExact(_options, getOptionLabel, getOptionValue, option);
    resetMenu(index);
    onChange(option);
  };

  const {
    focusedOptionIndex,
    setFocusedOptionIndex,
    menuOpened,
    selectOption,
    openMenu,
    containerRef,
    resetMenu,
    cancelSelection,
    onSearch,
    transitions
  } = useSelect(
    _options,
    setOption,
    disabled,
    onInputChange,
    inputValue,
    autoFocus,
    onChange,
    searchable
  );

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

  return {
    _options,
    containerRef,
    menuOpened,
    focusedOptionIndex,
    openMenu,
    setFocusedOptionIndex,
    selectOption,
    cancelSelection,
    onSearch,
    transitions
  };
}
