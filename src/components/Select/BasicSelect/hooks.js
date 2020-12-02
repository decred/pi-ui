import { useState, useRef, useCallback, useEffect } from "react";
import { useClickOutside, useHandleKeyboardHook } from "../hooks";
import { blankValue } from "../helpers";

export function useBasicSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  filterOptions
) {
  const optionContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const _options = filterOptions ? options.filter(filterOptions) : options;

  const defaultValueKeyGetter = useCallback(({ value }) => value, []);
  const defaultLabelKeyGetter = useCallback(({ label }) => label, []);

  const getValueKey = getOptionValue || defaultValueKeyGetter;
  const getLabelKey = getOptionLabel || defaultLabelKeyGetter;

  const [selectedOption, setSelectedOption] = useState(
    (defaultValue &&
      _options.find((x) => getValueKey(x) === getValueKey(defaultValue))) ||
      blankValue
  );

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus]);

  useEffect(() => {
    if (disabled) return;
    if (filterOptions && !filterOptions(selectedOption))
      setSelectedOption(blankValue);
  }, [disabled, selectedOption, filterOptions]);

  const setOption = (option, knownIndex) => {
    const index =
      knownIndex ||
      _options.findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
      );
    setSelectedOption(option);
    setFocusedOptionIndex(index);
    setMenuOpened(false);
  };

  useClickOutside(() => {
    setFocusedOptionIndex(0);
    setMenuOpened(false);
  })(optionContainerRef.current, dropdownRef.current);

  useHandleKeyboardHook((e) => {
    if (menuOpened) {
      const maxOptionIndex = _options.length - 1;
      if (e.key === "ArrowDown") {
        const newIndex =
          focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
        optionContainerRef.current
          .querySelector(`div[index="${newIndex}"]`)
          .scrollIntoViewIfNeeded(false);
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "ArrowUp") {
        const newIndex =
          focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
        optionContainerRef.current
          .querySelector(`div[index="${newIndex}"]`)
          .scrollIntoViewIfNeeded(true);
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "Enter") {
        const optionIndex = focusedOptionIndex;
        const optionByIndex = _options[optionIndex];
        if (onChange) {
          onChange(e, getValueKey(optionByIndex), optionByIndex);
        }
        setOption(optionByIndex, optionIndex);
      }
    }
  });

  const selectOption = (e) => {
    const findOptionWrapper = (el) =>
      el.getAttribute("index") ? el : findOptionWrapper(el.parentNode);

    const optionWrapper = findOptionWrapper(e.target);
    const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
    const optionByIndex = _options[optionIndex];
    if (onChange) {
      onChange(e, getValueKey(optionByIndex), optionByIndex);
    }
    setOption(optionByIndex, optionIndex);
  };

  const cancelSelection = (e) => {
    if (disabled) return;
    if (onChange) {
      onChange(e);
    }
    setSelectedOption(blankValue);
    setFocusedOptionIndex(0);
    setMenuOpened(false);
    e.stopPropagation();
  };

  const openMenu = () =>
    setMenuOpened((menuOpened) => !disabled && !menuOpened);

  return {
    _options,
    optionContainerRef,
    dropdownRef,
    menuOpened,
    selectedOption,
    focusedOptionIndex,
    openMenu,
    setFocusedOptionIndex,
    getValueKey,
    getLabelKey,
    selectOption,
    cancelSelection
  };
}
