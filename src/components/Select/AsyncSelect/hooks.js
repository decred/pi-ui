import { useState, useEffect } from "react";
import { useMountEffect, usePrevious } from "hooks";
import {
  useHandleKeyboardHook,
  useHandleKeyboardHookBasicParameters
} from "../hooks";
import { matchOption, uniqueOptionsByModifier } from "../helpers";

export function useAsyncSelect(
  options,
  getOptionLabel,
  inputValue,
  onInputChange,
  defaultOptions,
  cacheOptions,
  loadOptions,
  _options,
  setOptions,
  selectOption,
  menuOpened,
  setFocusedOptionIndex,
  focusedOptionIndex
) {
  const [_cachedOptions, setCachedOptions] = useState([]);
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

  return { onSearch, loading };
}
