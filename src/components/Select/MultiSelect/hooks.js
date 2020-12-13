import { useState, useEffect } from "react";
import { defaultLabelKeyGetter, defaultValueKeyGetter } from "../helpers";
import { useClickOutside, usePrevious, useMountEffect } from "hooks";
import { useHandleKeyboardHook } from "../hooks";

export function useMultiSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  filterOptions,
  searchable,
  value,
  inputValue,
  onInputChange
) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const getValueKey = getOptionValue || defaultValueKeyGetter;
  const getLabelKey = getOptionLabel || defaultLabelKeyGetter;

  const [_options, setOptions] = useState([]);

  useMountEffect(() => {
    if (defaultValue) onChange(defaultValue);
  });

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
  }, [searchable, getLabelKey, inputValue, filterOptions, options]);

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      if (searchable && onInputChange && inputValue) onInputChange("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus, searchable, onInputChange, inputValue]);

  const previousSelectedOptions = usePrevious(value);

  useEffect(() => {
    if (disabled) return;
    if (filterOptions && previousSelectedOptions !== value && value.length)
      onChange(value.filter(filterOptions));
  }, [disabled, value, filterOptions, previousSelectedOptions, onChange]);

  useEffect(() => {
    if (searchable && inputValue) setMenuOpened(_options.length > 0);
  }, [searchable, inputValue, _options]);

  const removeSelectedOption = (option) =>
    value.filter(
      (selectedOption) => getLabelKey(selectedOption) !== getLabelKey(option)
    );

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    if (searchable && onInputChange && inputValue) onInputChange("");
  };

  const setOption = (option, knownIndex) => {
    if (disabled) return;
    const index =
      knownIndex ||
      _options.findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
      );
    let newSelectedOptions = [];
    if (
      value.find(
        (selectedOption) => getLabelKey(selectedOption) === getLabelKey(option)
      )
    )
      newSelectedOptions = removeSelectedOption(option);
    else if (!value.length) {
      newSelectedOptions = [option];
    } else {
      newSelectedOptions = [...value, option];
    }
    setFocusedOptionIndex(index);
    if (searchable && onInputChange && inputValue) onInputChange("");
    onChange(newSelectedOptions);
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
    onChange([]);
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
    removeSelectedOption,
    onSearch
  };
}
