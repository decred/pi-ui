import { useState, useRef, useEffect } from "react";
import { useClickOutside, usePrevious } from "hooks";
import { useHandleKeyboardHook } from "../hooks";
import {
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";

export function useCreatableSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  getOptionLabel,
  getOptionValue,
  filterOptions,
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

  const getValueKey = getOptionValue || defaultValueKeyGetter;
  const getLabelKey = getOptionLabel || defaultLabelKeyGetter;

  const [_options, setOptions] = useState([]);

  const [showError, setShowError] = useState(false);
  const [addingNewOption, setAddingNewOption] = useState(false);

  const previousObjects = usePrevious({
    showError,
    inputValue
  });
  const previousShowError = previousObjects?.showError;

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      onInputChange(getLabelKey(value));
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, getLabelKey, value, autoFocus, onInputChange]);

  useEffect(() => {
    if (disabled) return;
    if (filterOptions && !filterOptions(value) && getLabelKey(value))
      {
        onInputChange("");
        onChange(blankValue);
      }
  }, [
    disabled,
    value,
    filterOptions,
    onInputChange,
    getLabelKey,
    onChange
  ]);

  useEffect(() => {
    if (showError) {
      setAddingNewOption(false);
      setMenuOpened(false);
    } else if (previousShowError) {
      setMenuOpened(true);
    }
  }, [previousShowError, showError]);

  useEffect(() => {
    let __options = [...options, ...newOptions.current].filter(
      (item, pos, self) =>
        self.findIndex((_item) => getLabelKey(_item) === getLabelKey(item)) ===
        pos
    );
    __options = filterOptions ? __options.filter(filterOptions) : __options;
    if (addingNewOption) {
      if (searchable && inputValue) {
        __options = __options.filter((__option) =>
          getLabelKey(__option)
            .toLowerCase()
            ?.includes(inputValue.toLowerCase())
        );
      }
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
    getLabelKey,
    typeLabel,
    filterOptions,
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
      knownIndex ||
      _options.findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
      );
    onInputChange(getLabelKey(option));
    resetMenu(index);
    onChange(option);
  };

  const [containerRef] = useClickOutside(() => {
    resetMenu();
    onInputChange(getLabelKey(value));
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
    const findOptionWrapper = (el) =>
      el.getAttribute("index") ? el : findOptionWrapper(el.parentNode);

    const optionWrapper = findOptionWrapper(e.target);
    const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
    if (optionIndex === 0) return;
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
    const _newOption = e.target.value;
    if (!isValidNewOption(_newOption)) {
      setShowError(true);
      onInputChange(_newOption);
      return;
    }
    setShowError(false);
    if (
      searchable &&
      _newOption &&
      filterOptions &&
      !filterOptions({ label: _newOption, value: _newOption })
    ) {
      setAddingNewOption(false);
      onInputChange(_newOption);
      return;
    }
    setAddingNewOption(!!_newOption);
    onInputChange(_newOption);
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
    getValueKey,
    getLabelKey,
    selectOption,
    cancelSelection,
    inputValue,
    addingNewOption,
    promptTextCreatorCallback,
    onCreatableChange,
    newOptionCreatorCallback
  };
}
