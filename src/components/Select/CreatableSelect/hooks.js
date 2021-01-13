import { useState, useRef, useEffect } from "react";
import { useHandleKeyboardHook } from "../hooks";
import { blankValue, filterByMatchOption } from "../helpers";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import concat from "lodash/fp/concat";
import uniqBy from "lodash/fp/uniqBy";

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
  setInvalidNewOption
) {
  const newOptions = useRef([]);
  const [addingNewOption, setAddingNewOption] = useState(false);
  const firstOption = useRef(blankValue);

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

  const newFirstOption = { value: "" };
  if (addingNewOption && inputValue) {
    newFirstOption.label = promptTextCreator(inputValue);
    newFirstOption.onClick = newOptionCreatorCallback;
  } else {
    newFirstOption.label = typeLabel;
    newFirstOption.onClick = () => {};
  }
  firstOption.current = newFirstOption;

  useEffect(() => {
    const isMatch = addingNewOption && searchable && inputValue;
    const updatedOptions = flow([
      (opt) => [...opt, ...newOptions.current],
      uniqBy((value) => getOptionLabel(value)),
      filter(optionsFilter),
      filterByMatchOption(getOptionLabel, inputValue, isMatch),
      concat(firstOption.current)
    ])(options);
    setCurrentOptions(updatedOptions);
  }, [
    addingNewOption,
    inputValue,
    options,
    getOptionLabel,
    optionsFilter,
    searchable,
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
    setInvalidNewOption(hasError);
    setMenuOpened(!hasError);
  };

  return {
    onSearch
  };
}
