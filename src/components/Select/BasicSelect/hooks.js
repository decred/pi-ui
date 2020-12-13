import { useState, useEffect } from "react";
import { useClickOutside } from "hooks";
import { useHandleKeyboardHook } from "../hooks";
import {
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";

export function useBasicSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  filterOptions,
  value,
  searchable,
  inputValue,
  onInputChange
) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const getValueKey = getOptionValue || defaultValueKeyGetter;
  const getLabelKey = getOptionLabel || defaultLabelKeyGetter;

  const [_options, setOptions] = useState([]);

  useEffect(() => {
    let filteredOptions = filterOptions
      ? options.filter(filterOptions)
      : options;
    if (searchable && inputValue)
      filteredOptions = filteredOptions.filter((_option) =>
        getLabelKey(_option)
          .toLowerCase()
          ?.includes(inputValue.toLowerCase())
      );
    setOptions(filteredOptions);
  }, [searchable, inputValue, filterOptions, options, getLabelKey]);

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      if (searchable && onInputChange && inputValue) onInputChange("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus, searchable, inputValue, onInputChange]);

  useEffect(() => {
    if (disabled) return;
    if (filterOptions && !filterOptions(value) && getLabelKey(value))
      onChange(blankValue);
  }, [disabled, value, filterOptions, onChange, getLabelKey]);

  useEffect(() => {
    if (searchable && inputValue) setMenuOpened(_options.length > 0);
  }, [searchable, inputValue, _options, menuOpened]);

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    if (searchable && onInputChange && inputValue) onInputChange("");
  };

  const setOption = (option, knownIndex) => {
    const index =
      knownIndex ||
      _options.findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
      );
    resetMenu(index);
    onChange(option);
  };

  const [containerRef] = useClickOutside(resetMenu);

  const onTypeArrowDownHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = _options.length - 1;
    const newIndex =
      focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeArrowUpHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = _options.length - 1;
    const newIndex =
      focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeEnterHandler = () => {
    if (!menuOpened) return;
    const optionIndex = focusedOptionIndex;
    const optionByIndex = _options[optionIndex];
    setOption(optionByIndex, optionIndex);
  };

  const onTypeDefaultHandler = (e) => {
    if (!menuOpened) return;
    if (
      searchable &&
      !inputValue &&
      String.fromCharCode(e.keyCode).match(/(\w|\s)/g) &&
      onInputChange
    )
      onInputChange(e.key);
  };

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeEnterHandler,
    onTypeDefaultHandler
  );

  const selectOption = (e) => {
    const findOptionWrapper = (el) =>
      el.getAttribute("index") ? el : findOptionWrapper(el.parentNode);

    const optionWrapper = findOptionWrapper(e.target);
    const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
    const optionByIndex = _options[optionIndex];
    setOption(optionByIndex, optionIndex);
  };

  const cancelSelection = (e) => {
    if (disabled) return;
    onChange(blankValue);
    resetMenu();
    e.stopPropagation();
  };

  const openMenu = () =>
    setMenuOpened((menuOpened) => !disabled && !menuOpened);

  const onSearch = (e) => {
    const searchValue = e.target.value;
    if (onInputChange) onInputChange(searchValue);
  };

  return {
    _options,
    containerRef,
    menuOpened,
    focusedOptionIndex,
    openMenu,
    setFocusedOptionIndex,
    getValueKey,
    getLabelKey,
    selectOption,
    cancelSelection,
    onSearch
  };
}
