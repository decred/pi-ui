import { useState, useRef, useCallback, useEffect } from "react";
import { useClickOutside, useHandleKeyboardHook, usePrevious } from "../hooks";

export function useMultiSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  defaultValues,
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

  const [_options, setOptions] = useState(
    filterOptions ? options.filter(filterOptions) : options
  );

  useEffect(() => {
    if (isSearchable) {
      if (searchingFor)
        setOptions(
          (filterOptions ? options.filter(filterOptions) : options).filter(
            (_option) =>
              getLabelKey(_option)
                .toLowerCase()
                ?.includes(searchingFor.toLowerCase())
          )
        );
      else setOptions(filterOptions ? options.filter(filterOptions) : options);
    } else {
      setOptions(filterOptions ? options.filter(filterOptions) : options);
    }
  }, [searchingFor, filterOptions, options]);

  const [selectedOptions, setSelectedOptions] = useState(
    _options.filter((_option) =>
      defaultValues.find(
        (defaultValue) => getValueKey(defaultValue) === getValueKey(_option)
      )
    ) || []
  );

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      setSearchingFor("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus]);

  const previousSelectedOptions = usePrevious(selectedOptions);

  useEffect(() => {
    if (disabled) return;
    if (filterOptions && previousSelectedOptions !== selectedOptions)
      setSelectedOptions(selectedOptions.filter(filterOptions));
  }, [disabled, selectedOptions, filterOptions, previousSelectedOptions]);

  useEffect(() => {
    if (isSearchable) setMenuOpened(_options.length > 0);
  }, [isSearchable, _options]);

  const removeSelectedOption = (option) => {
    if (disabled) return;
    setSelectedOptions(
      selectedOptions.filter(
        (selectedOption) => getLabelKey(selectedOption) !== getLabelKey(option)
      )
    );
  };

  const setOption = (option, knownIndex) => {
    const index =
      knownIndex ||
      _options.findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
      );
    if (
      selectedOptions.find(
        (selectedOption) => getLabelKey(selectedOption) === getLabelKey(option)
      )
    )
      removeSelectedOption(option);
    else if (!selectedOptions.length) {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    setFocusedOptionIndex(index);
    setSearchingFor("");
  };

  useClickOutside(() => {
    setFocusedOptionIndex(0);
    setMenuOpened(false);
    setSearchingFor("");
  }, !_options.length)(optionContainerRef.current, dropdownRef.current);

  useHandleKeyboardHook((e) => {
    if (menuOpened) {
      const maxOptionIndex = _options.length - 1;
      switch (e.key) {
        case "ArrowDown": {
          const newIndex =
            focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
          if (
            !optionContainerRef.current?.querySelector(
              `div[index="${newIndex}"]`
            )
          )
            return;
          setFocusedOptionIndex(newIndex);
          break;
        }
        case "ArrowUp": {
          const newIndex =
            focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
          if (
            !optionContainerRef.current?.querySelector(
              `div[index="${newIndex}"]`
            )
          )
            return;
          setFocusedOptionIndex(newIndex);
          break;
        }
        case "Enter": {
          const optionIndex = focusedOptionIndex;
          const optionByIndex = _options[optionIndex];
          if (
            selectedOptions.find(
              (selectedOption) =>
                getLabelKey(selectedOption) === getLabelKey(optionByIndex)
            )
          )
            removeSelectedOption(optionByIndex);
          if (onChange) {
            onChange(e, getValueKey(optionByIndex), optionByIndex);
          }
          setOption(optionByIndex, optionIndex);
          break;
        }
        default: {
          if (
            isSearchable &&
            !searchingFor &&
            String.fromCharCode(e.keyCode).match(/(\w|\s)/g)
          )
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
    setSelectedOptions([]);
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
  }, []);

  return {
    _options,
    optionContainerRef,
    dropdownRef,
    menuOpened,
    selectedOptions,
    focusedOptionIndex,
    openMenu,
    setFocusedOptionIndex,
    getValueKey,
    getLabelKey,
    selectOption,
    cancelSelection,
    removeSelectedOption,
    searchingFor,
    onSearch
  };
}
