import { useCallback, useEffect, useState } from "react";
import { useHandleKeyboardHook } from "../hooks";
import { matchOption } from "../helpers";
import uniqBy from "lodash/unionBy";

export function useAsyncSelect(
  options,
  getOptionLabel,
  inputValue,
  defaultOptions,
  cacheOptions,
  loadOptions,
  setCurrentOptions,
  selectOption,
  onTypeArrowDownHandler,
  onTypeArrowUpHandler,
  onTypeDefaultHandler
) {
  const [cachedOptions, setCachedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterOptions = useCallback(
    (optionsToFilter) =>
      optionsToFilter.filter(matchOption(getOptionLabel, inputValue)),
    [getOptionLabel, inputValue]
  );

  const updateCachedOptions = useCallback(
    (values) => {
      const updatedCachedOptions = uniqBy(
        [...cachedOptions, ...values],
        (value) => getOptionLabel(value)
      );
      if (!defaultOptions) setCachedOptions(updatedCachedOptions);
      setCurrentOptions(filterOptions([...options, ...updatedCachedOptions]));
    },
    [
      defaultOptions,
      options,
      cachedOptions,
      getOptionLabel,
      filterOptions,
      setCurrentOptions
    ]
  );

  const loadNewOptions = useCallback(
    (value) => {
      setLoading(true);
      loadOptions(value).then((newOptions) => {
        if (cacheOptions) updateCachedOptions(newOptions);
        else setCurrentOptions(filterOptions([...options, ...newOptions]));
        setLoading(false);
      });
    },
    [
      loadOptions,
      cacheOptions,
      filterOptions,
      updateCachedOptions,
      setCurrentOptions,
      options
    ]
  );

  useEffect(() => {
    if (inputValue || defaultOptions === true) {
      loadNewOptions(inputValue);
    } else if (Array.isArray(defaultOptions)) {
      setCurrentOptions(defaultOptions);
    } else {
      setCurrentOptions([...options, ...cachedOptions]);
    }
  }, [
    loadNewOptions,
    inputValue,
    defaultOptions,
    options,
    cachedOptions,
    setCurrentOptions
  ]);

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    selectOption,
    onTypeDefaultHandler
  );

  return { loading };
}
