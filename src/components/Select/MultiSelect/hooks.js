import { useEffect } from "react";
import { usePrevious } from "hooks";
import {
  useHandleKeyboardHook,
  useHandleKeyboardHookBasicParameters
} from "../hooks";
import { matchOption } from "../helpers";

export function useMultiSelect(
  disabled,
  onChange,
  options,
  getOptionLabel,
  optionsFilter,
  searchable,
  value,
  inputValue,
  onInputChange,
  _options,
  setOptions,

  focusedOptionIndex,
  setFocusedOptionIndex,
  menuOpened,
  selectOption,
  resetMenu,
  removeSelectedOptionFilter
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
    getOptionLabel,
    inputValue,
    optionsFilter,
    options,
    setOptions
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
