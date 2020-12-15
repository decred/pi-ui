import { useState, useEffect } from "react";
import { usePrevious } from "hooks";
import {
  useHandleKeyboardHook,
  useHandleKeyboardHookBasicParamters,
  useSelect
} from "../hooks";
import { matchOption, findExact } from "../helpers";

export function useMultiSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  optionsFilter,
  searchable,
  value,
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
  }, [searchable, getOptionLabel, inputValue, optionsFilter, options]);

  const previousSelectedOptions = usePrevious(value);

  useEffect(() => {
    if (disabled) return;
    if (optionsFilter && previousSelectedOptions !== value && value.length)
      onChange(value.filter(optionsFilter));
  }, [disabled, value, optionsFilter, previousSelectedOptions, onChange]);

  const removeSelectedOptionFilter = (option) =>
    value.filter(
      (selectedOption) =>
        getOptionLabel(selectedOption) !== getOptionLabel(option)
    );

  const removeSelectedOption = (e, option) => {
    onChange(removeSelectedOptionFilter(option));
    e.stopPropagation();
  };

  const setOption = (option, knownIndex) => {
    if (disabled) return;
    const index =
      knownIndex || findExact(_options, getOptionLabel, getOptionValue, option);
    let newSelectedOptions = [];
    if (
      value.find(
        (selectedOption) =>
          getOptionLabel(selectedOption) === getOptionLabel(option)
      )
    )
      newSelectedOptions = removeSelectedOptionFilter(option);
    else if (!value.length) {
      newSelectedOptions = [option];
    } else {
      newSelectedOptions = [...value, option];
    }
    setFocusedOptionIndex(index);
    if (searchable && onInputChange && inputValue) onInputChange("");
    onChange(newSelectedOptions);
  };

  const {
    focusedOptionIndex,
    setFocusedOptionIndex,
    menuOpened,
    selectOption,
    openMenu,
    containerRef,
    resetMenu,
    onSearch
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
    onTypeEnterHandler,
    onTypeDefaultHandler
  } = useHandleKeyboardHookBasicParamters(
    menuOpened,
    _options,
    focusedOptionIndex,
    setFocusedOptionIndex,
    setOption,
    inputValue,
    onInputChange,
    searchable
  );

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeEnterHandler,
    onTypeDefaultHandler
  );

  const cancelSelection = (e) => {
    if (disabled) return;
    onChange([]);
    resetMenu();
    e.stopPropagation();
  };

  return {
    _options,
    containerRef,
    menuOpened,
    focusedOptionIndex,
    openMenu,
    setFocusedOptionIndex,
    selectOption,
    cancelSelection,
    removeSelectedOption,
    onSearch
  };
}
