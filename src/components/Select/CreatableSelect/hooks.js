import { useState, useRef, useEffect } from "react";
import { usePrevious } from "hooks";
import { useHandleKeyboardHook } from "../hooks";
import { blankValue, matchOption } from "../helpers";
import flow from "lodash/flow";
import filter from "lodash/filter";
import identity from "lodash/identity";
import uniqBy from "lodash/uniqBy";

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
    if (optionsFilter && !optionsFilter(value) && getOptionLabel(value)) {
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
    const updatedOptions = flow(
      addingNewOption && searchable && inputValue
        ? filter(matchOption(getOptionLabel, inputValue))
        : identity,
      optionsFilter ? filter(optionsFilter) : identity,
      uniqBy((value) => getOptionLabel(value))
    )([...options, ...newOptions.current]);

    updatedOptions.unshift(firstOption);

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
    if (!inputValue && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
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
    if (
      newOption &&
      optionsFilter &&
      !optionsFilter({ label: newOption, value: newOption })
    )
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
