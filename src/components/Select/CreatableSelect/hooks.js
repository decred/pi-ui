import { useState, useRef, useEffect } from "react";
import { usePrevious } from "hooks";
import { useHandleKeyboardHook } from "../hooks";
import { blankValue, filterByMatchOption } from "../helpers";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import concat from "lodash/fp/concat";
import uniqBy from "lodash/fp/uniqBy";

const newFirstOption = {
  label: "",
  value: "",
  onClick: null
};

export function useCreatableSelect(
  disabled,
  onChange,
  options,
  getOptionLabel,
  optionsFilter,
  searchable,
  value,
  inputValue,
  onInputChange,
  menuOpened,
  selectOption,
  setMenuOpened,
  typeLabel,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator,
  setCurrentOptions,
  setOption,
  onTypeArrowDownHandler,
  onTypeArrowUpHandler,
  setShowError
) {
  const newOptions = useRef([]);
  const [addingNewOption, setAddingNewOption] = useState(false);
  const [firstOption, setFirstOption] = useState(blankValue);

  useEffect(() => {
    if (disabled) return;
    if (!optionsFilter(value) && getOptionLabel(value)) {
      onInputChange("");
      onChange(blankValue);
    }
  }, [disabled, value, optionsFilter, onInputChange, getOptionLabel, onChange]);

  const newOptionCreatorCallback = () => {
    if (newOptionCreator) newOptionCreator(inputValue);
    const newOptionObject = { label: inputValue, value: inputValue };
    newOptions.current.push(newOptionObject);
    setOption(newOptionObject);
  };

  newFirstOption.label =
    addingNewOption && inputValue ? promptTextCreator(inputValue) : typeLabel;
  newFirstOption.value = "";
  newFirstOption.onClick =
    addingNewOption && inputValue ? newOptionCreatorCallback : () => {};

  const previousInputValue = usePrevious(inputValue);

  useEffect(() => {
    if (previousInputValue !== inputValue) setFirstOption(newFirstOption);
  }, [inputValue, previousInputValue]);

  useEffect(() => {
    const isMatch = addingNewOption && searchable && inputValue;

    const updatedOptions = flow([
      (opt) => [...opt, ...newOptions.current],
      uniqBy((value) => getOptionLabel(value)),
      filter(optionsFilter),
      filterByMatchOption(getOptionLabel, inputValue, isMatch),
      concat(firstOption)
    ])(options);

    setCurrentOptions(updatedOptions);
  }, [
    addingNewOption,
    inputValue,
    options,
    getOptionLabel,
    optionsFilter,
    searchable,
    firstOption,
    setCurrentOptions
  ]);

  const onTypeDefaultHandler = (e) => {
    if (!menuOpened) return;
    const canLoadOptions =
      !inputValue && String.fromCharCode(e.keyCode).match(/(\w|\s)/g);
    if (canLoadOptions) {
      setAddingNewOption(true);
      onInputChange(e.key);
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
    const newOption = e.target.value;
    const hasError = isValidNewOption && !isValidNewOption(newOption);
    if (newOption && !optionsFilter({ label: newOption, value: newOption }))
      setAddingNewOption(false);
    else setAddingNewOption(!!newOption);
    onInputChange(newOption);
    setShowError(hasError);
    setMenuOpened(!hasError);
  };

  return {
    onSearch
  };
}
