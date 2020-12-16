import { useState, useEffect } from "react";
import { useMountEffect, usePrevious } from "hooks";
import {
  useHandleKeyboardHook,
  useHandleKeyboardHookBasicParameters,
  useSelect
} from "../hooks";
import { matchOption, uniqueOptionsByModifier, findExact } from "../helpers";

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
  const [_cachedOptions, setCachedOptions] = useState([]);
  const [_options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateOptions = (value) => {
    if (value)
      setOptions(
        matchOption([...options, ..._cachedOptions], getOptionLabel, value)
      );
  };

  const updateCachedOptions = (values) => {
    const updatedCachedOptions = uniqueOptionsByModifier(
      [..._cachedOptions, ...values],
      getOptionLabel
    );
    setCachedOptions(updatedCachedOptions);
  };

  const _loadOptions = (value, ignoreEmpty) => {
    if (!onInputChange) return;
    onInputChange(value);
    setLoading(true);
    loadOptions(value).then((result) => {
      if (cacheOptions) updateCachedOptions(result);
      else {
        const loadedOptions = matchOption(options, getOptionLabel, value);
        if (!ignoreEmpty || value) loadedOptions.push(...result);
        setOptions(loadedOptions);
      }
      setLoading(false);
    });
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
    transitions
  } = useSelect(
    _options,
    setOption,
    disabled,
    onInputChange,
    inputValue,
    autoFocus,
    onChange
  );

  const {
    onTypeArrowDownHandler,
    onTypeArrowUpHandler
  } = useHandleKeyboardHookBasicParameters(
    menuOpened,
    _options,
    focusedOptionIndex,
    setFocusedOptionIndex,
    inputValue,
    onInputChange
  );

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
    selectOption,
    onTypeDefaultHandler
  );

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
    selectOption,
    cancelSelection,
    onSearch,
    loading,
    transitions
  };
}
