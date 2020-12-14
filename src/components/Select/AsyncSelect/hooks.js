import { useState, useEffect } from "react";
import { useClickOutside, useMountEffect, usePrevious } from "hooks";
import { useHandleKeyboardHook } from "../hooks";
import {
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";

export function useAsyncSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  inputValue,
  onInputChange,
  defaultOptions,
  cacheOptions,
  loadOptions
) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const [_cachedOptions, setCachedOptions] = useState([]);
  const [_options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getValueKey = getOptionValue || defaultValueKeyGetter;
  const getLabelKey = getOptionLabel || defaultLabelKeyGetter;

  const updateOptions = (value) => {
    let updatedOptions = [...options, ..._cachedOptions];
    if (value)
      updatedOptions = updatedOptions.filter((_option) =>
        getLabelKey(_option)
          .toLowerCase()
          ?.includes(value.toLowerCase())
      );
    setOptions(updatedOptions);
  };

  const updateCachedOptions = (values) => {
    let updatedCachedOptions = [..._cachedOptions, ...values];
    updatedCachedOptions = updatedCachedOptions.filter(
      (value, index, array) =>
        array.findIndex((temp) => getLabelKey(temp) === getLabelKey(value)) ===
        index
    );
    setCachedOptions(updatedCachedOptions);
  };

  const _loadOptions = (value, ignoreEmpty) => {
    if (onInputChange) {
      onInputChange(value);
      setLoading(true);
      loadOptions(value).then((result) => {
        if (cacheOptions) updateCachedOptions(result);
        else
          setOptions([
            ...options.filter((_option) =>
              getLabelKey(_option)
                .toLowerCase()
                ?.includes(value.toLowerCase())
            ),
            ...(ignoreEmpty && !value ? [] : result)
          ]);
        setLoading(false);
      });
    }
  };

  const previousCachedOptions = usePrevious(_cachedOptions);

  useMountEffect(() => {
    if (defaultOptions === true) _loadOptions(inputValue);
    else if (Array.isArray(defaultOptions))
      if (cacheOptions) updateCachedOptions(defaultOptions);
      else setOptions([...options, ...defaultOptions]);
    else setOptions(options);
  });

  useEffect(() => {
    if (
      cacheOptions &&
      previousCachedOptions &&
      previousCachedOptions !== _cachedOptions
    )
      updateOptions(inputValue);
  });

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      if (onInputChange && inputValue) onInputChange("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus, inputValue, onInputChange]);

  useEffect(() => {
    if (inputValue) setMenuOpened(_options.length > 0);
  }, [inputValue, _options, menuOpened]);

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    if (onInputChange && inputValue) onInputChange("");
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
    if (!inputValue && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
      _loadOptions(e.key, true);
      e.preventDefault();
    }
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
    _loadOptions(searchValue, true);
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
    onSearch,
    loading
  };
}
