import { useState, useRef, useEffect } from "react";
import { usePrevious } from "hooks";
import {
  useHandleKeyboardHook,
  useHandleKeyboardHookBasicParameters,
  useSelect
} from "../hooks";
import {
  blankValue,
  matchOption,
  uniqueOptionsByModifier,
  findExact
} from "../helpers";

export function useCreatableSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  optionsFilter,
  searchable,
  value,
  inputValue,
  onInputChange,
  typeLabel,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator
) {
  const newOptions = useRef([]);
  const [_options, setOptions] = useState([]);
  const [showError, setShowError] = useState(false);
  const [addingNewOption, setAddingNewOption] = useState(false);
  const [firstOption, setFirstOption] = useState(null);

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
    setMenuOpened
  } = useSelect(
    _options,
    setOption,
    disabled,
    onInputChange,
    inputValue,
    autoFocus,
    onChange,
    searchable,
    showError
  );

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

  const previousFirstOption = usePrevious(firstOption);

  useEffect(() => {
    const newFirstOption = addingNewOption && inputValue
      ? {
        label: promptTextCreator(inputValue),
        value: "",
        onClick: newOptionCreatorCallback
      }
      : { label: typeLabel, value: "", onClick: () => { } };
    if (!previousFirstOption || previousFirstOption?.label !== newFirstOption.label)
      setFirstOption(newFirstOption);
  }, [
    addingNewOption,
    inputValue,
    promptTextCreator,
    newOptionCreatorCallback
  ]);

  useEffect(() => {
    let updatedOptions = uniqueOptionsByModifier(
      [...options, ...newOptions.current],
      getOptionLabel
    );
    if (optionsFilter)
      updatedOptions = updatedOptions.filter(optionsFilter);
    if (addingNewOption && searchable && inputValue)
      updatedOptions = matchOption(updatedOptions, getOptionLabel, inputValue);
    updatedOptions.unshift(firstOption);
    setOptions(updatedOptions);
  }, [
    addingNewOption,
    inputValue,
    options,
    getOptionLabel,
    optionsFilter,
    searchable,
    firstOption
  ]);

  const {
    onTypeArrowDownHandler,
    onTypeArrowUpHandler
  } = useHandleKeyboardHookBasicParameters(
    menuOpened,
    _options,
    focusedOptionIndex,
    setFocusedOptionIndex,
    inputValue,
    onInputChange,
    searchable
  );

  const onTypeDefaultHandler = (e) => {
    if (!menuOpened) return;
    if (!inputValue && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
      onInputChange(e.key);
      setAddingNewOption(true);
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
    else
      setAddingNewOption(!!newOption);
    onInputChange(newOption);
    setShowError(hasError);
    setMenuOpened(!hasError);
  };

  return {
    _options,
    containerRef,
    menuOpened,
    focusedOptionIndex,
    openMenu,
    showError,
    setFocusedOptionIndex,
    selectOption,
    cancelSelection,
    inputValue,
    addingNewOption,
    onSearch
  };
}
