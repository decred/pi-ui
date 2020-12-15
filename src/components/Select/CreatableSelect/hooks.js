import { useState, useRef, useEffect } from "react";
import { useClickOutside, usePrevious, useMountEffect } from "hooks";
import { useHandleKeyboardHook } from "../hooks";
import {
  blankValue,
  matchOption,
  uniqueOptionsByModifier,
  findExact,
  findOptionWrapper
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
  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const [_options, setOptions] = useState([]);
  const [showError, setShowError] = useState(false);
  const [addingNewOption, setAddingNewOption] = useState(false);

  const previousShowError = usePrevious(showError);

  useMountEffect(() => {
    if (!inputValue && getOptionLabel(value))
      onInputChange(getOptionLabel(value));
  });

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      onInputChange(getOptionLabel(value));
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, getOptionLabel, value, autoFocus, onInputChange]);

  useEffect(() => {
    if (disabled) return;
    if (optionsFilter && !optionsFilter(value) && getOptionLabel(value)) {
      onInputChange("");
      onChange(blankValue);
    }
  }, [disabled, value, optionsFilter, onInputChange, getOptionLabel, onChange]);

  useEffect(() => {
    if (showError) {
      setAddingNewOption(false);
      setMenuOpened(false);
    } else if (previousShowError) {
      setMenuOpened(true);
    }
  }, [previousShowError, showError]);

  useEffect(() => {
    let __options = uniqueOptionsByModifier(
      [...options, ...newOptions.current],
      getOptionLabel
    );
    __options = optionsFilter ? __options.filter(optionsFilter) : __options;
    if (addingNewOption && searchable && inputValue) {
      __options = matchOption(__options, getOptionLabel, inputValue);
    } else {
      __options.unshift({
        label: typeLabel,
        value: ""
      });
    }
    setOptions(__options);
  }, [
    addingNewOption,
    inputValue,
    options,
    getOptionLabel,
    typeLabel,
    optionsFilter,
    searchable
  ]);

  useEffect(() => {
    if (focusedOptionIndex > _options.length || focusedOptionIndex < 0)
      setFocusedOptionIndex(0);
  }, [focusedOptionIndex, _options]);

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    setAddingNewOption(false);
  };

  const setOption = (option, knownIndex) => {
    const index =
      knownIndex || findExact(_options, getOptionLabel, getOptionValue, option);
    onInputChange(getOptionLabel(option));
    resetMenu(index);
    onChange(option);
  };

  const [containerRef] = useClickOutside(() => {
    resetMenu();
    onInputChange(getOptionLabel(value));
    setShowError(false);
  });

  const newOptionCreatorCallback = () => {
    newOptionCreator(inputValue);
    const newOptionObject = { label: inputValue, value: inputValue };
    newOptions.current.push(newOptionObject);
    setOption(newOptionObject);
  };

  const onTypeArrowDownHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = _options.length + addingNewOption - 1;
    const newIndex =
      focusedOptionIndex === maxOptionIndex
        ? addingNewOption
          ? 0
          : 1
        : focusedOptionIndex + 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeArrowUpHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = _options.length + addingNewOption - 1;
    const newIndex =
      focusedOptionIndex === (addingNewOption ? 0 : 1)
        ? maxOptionIndex
        : focusedOptionIndex - 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeEnterHandler = () => {
    if (!menuOpened) return;
    let optionIndex = focusedOptionIndex;
    if (optionIndex === 0 && addingNewOption && inputValue)
      newOptionCreatorCallback();
    if (optionIndex === 0) return;
    optionIndex = optionIndex - addingNewOption;
    const optionByIndex = _options[optionIndex];
    setOption(optionByIndex, optionIndex);
  };

  useHandleKeyboardHook(
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeEnterHandler
  );

  const selectOption = (e) => {
    const optionWrapper = findOptionWrapper(e.target);
    const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
    if (!optionIndex) return;
    const optionByIndex = _options[optionIndex];
    setOption(optionByIndex, optionIndex);
  };

  const cancelSelection = (e) => {
    if (disabled) return;
    onChange(blankValue);
    resetMenu();
    onInputChange("");
    e.stopPropagation();
  };

  const openMenu = () =>
    setMenuOpened((menuOpened) => !disabled && !menuOpened);

  const promptTextCreatorCallback = () => promptTextCreator(inputValue);

  const onCreatableChange = (e) => {
    const newOption = e.target.value;
    if (!isValidNewOption(newOption)) {
      setShowError(true);
      onInputChange(newOption);
      return;
    }
    setShowError(false);
    if (
      newOption &&
      optionsFilter &&
      !optionsFilter({ label: newOption, value: newOption })
    ) {
      setAddingNewOption(false);
      onInputChange(newOption);
      return;
    }
    setAddingNewOption(!!newOption);
    onInputChange(newOption);
    setMenuOpened(true);
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
    promptTextCreatorCallback,
    onCreatableChange,
    newOptionCreatorCallback
  };
}
