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
  filterOptions,
  isSearchable
) {
  const optionContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const [searchingFor, setSearchingFor] = useState("");

  const defaultValueKeyGetter = useCallback(({ value }) => value, []);
  const defaultLabelKeyGetter = useCallback(({ label }) => label, []);

  const getValueKey = getOptionValue || defaultValueKeyGetter;
  const getLabelKey = getOptionLabel || defaultLabelKeyGetter;

  const [_options, setOptions] = useState(filterOptions ? options.filter(filterOptions) : options);

  useEffect(() => {
    if (isSearchable) {
      if (searchingFor)
        setOptions((filterOptions ? options.filter(filterOptions) : options).filter(
          _option => getLabelKey(_option).toLowerCase()?.includes(searchingFor.toLowerCase())
        ));
      else
        setOptions(filterOptions ? options.filter(filterOptions) : options);
    } else {
      setOptions(filterOptions ? options.filter(filterOptions) : options);
    }
  }, [searchingFor, filterOptions, options])

  const [selectedOption, setSelectedOption] = useState(
    (defaultValue &&
      _options.find((x) => getValueKey(x) === getValueKey(defaultValue))) ||
    blankValue
  );

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      setSearchingFor("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus]);

  useEffect(() => {
    if (disabled) return;
    if (filterOptions && !filterOptions(selectedOption))
      setSelectedOption(blankValue);
  }, [disabled, selectedOption, filterOptions]);

  useEffect(() => {
    if (isSearchable)
      setMenuOpened(_options.length > 0);
  }, [isSearchable, _options]);

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
    setSearchingFor("");
  };

  useClickOutside(() => {
    setFocusedOptionIndex(0);
    setMenuOpened(false);
    setSearchingFor("");
  })(optionContainerRef.current, dropdownRef.current);

  useHandleKeyboardHook((e) => {
    if (menuOpened) {
      const maxOptionIndex = _options.length - 1;
      switch (e.key) {
        case "ArrowDown": {
          const newIndex =
            focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
          if (!(optionContainerRef.current?.querySelector(`div[index="${newIndex}"]`)))
            return;
          setFocusedOptionIndex(newIndex);
          break;
        }
        case "ArrowUp": {
          const newIndex =
            focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
          if (!(optionContainerRef.current?.querySelector(`div[index="${newIndex}"]`)))
            return;
          setFocusedOptionIndex(newIndex);
          break;
        }
        case "Enter": {
          const optionIndex = focusedOptionIndex;
          const optionByIndex = _options[optionIndex];
          if (onChange) {
            onChange(e, getValueKey(optionByIndex), optionByIndex);
          }
          setOption(optionByIndex, optionIndex);
          break;
        }
        default: {
          if (isSearchable && !searchingFor && String.fromCharCode(e.keyCode).match(/(\w|\s)/g))
            setSearchingFor(e.key);
        }
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
    setSearchingFor("");
    e.stopPropagation();
  };

  const openMenu = () =>
    setMenuOpened((menuOpened) => !disabled && !menuOpened);

  const onSearch = useCallback((e) => {
    const searchValue = e.target.value;
    setSearchingFor(searchValue);
  }, [])

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
    cancelSelection,
    searchingFor,
    onSearch
  };
}
