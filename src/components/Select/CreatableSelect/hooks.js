import { useState, useRef, useCallback, useEffect } from "react";
import { useClickOutside, useHandleKeyboardHook, usePrevious } from "../hooks";
import { blankValue } from "../helpers";

export function useCreatableSelect(
  disabled,
  autoFocus,
  onChange,
  options,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  filterOptions,

  typeLabel,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator
) {
  const optionContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const newOptions = useRef([]);

  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const defaultValueKeyGetter = useCallback(({ value }) => value, []);
  const defaultLabelKeyGetter = useCallback(({ label }) => label, []);

  const getValueKey = getOptionValue || defaultValueKeyGetter;
  const getLabelKey = getOptionLabel || defaultLabelKeyGetter;

  let _options = [...options, ...newOptions.current].filter(
    (item, pos, self) =>
      self.findIndex((_item) => getLabelKey(_item) === getLabelKey(item)) ===
      pos
  );
  _options = filterOptions ? _options.filter(filterOptions) : _options;
  _options.unshift({
    label: typeLabel || "Type to add a new option",
    value: ""
  });

  const [selectedOption, setSelectedOption] = useState(
    (defaultValue &&
      _options.find((x) => getValueKey(x) === getValueKey(defaultValue))) ||
      blankValue
  );

  const [newOption, setNewOption] = useState("");
  const [addingNewOption, setAddingNewOption] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      setNewOption(getLabelKey(selectedOption));
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, getLabelKey, selectedOption, autoFocus]);

  const previousObjects = usePrevious({ showError, newOption });
  const previousShowError = previousObjects?.showError;
  const previousNewOption = previousObjects?.newOption;

  useEffect(() => {
    if (disabled) return;
    if (filterOptions) {
      if (!filterOptions(selectedOption)) setSelectedOption(blankValue);
      if (!filterOptions({ label: newOption, value: newOption }))
        setNewOption(previousNewOption);
    }
  }, [disabled, selectedOption, filterOptions, newOption, previousNewOption]);

  useEffect(() => {
    if (showError) {
      setAddingNewOption(false);
      setMenuOpened(false);
    } else if (previousShowError) {
      setMenuOpened(true);
    }
  }, [previousShowError, showError]);

  const setOption = (option, knownIndex) => {
    const index =
      knownIndex ||
      _options.findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
      );
    setSelectedOption(option);
    setFocusedOptionIndex(index);
    setMenuOpened(false);
  };

  const clickOutside = useCallback(() => {
    setFocusedOptionIndex(0);
    setAddingNewOption(false);
    setNewOption(getLabelKey(selectedOption));
    setMenuOpened(false);
    setShowError(false);
  }, [getLabelKey, selectedOption]);

  useClickOutside(clickOutside)(
    optionContainerRef.current,
    dropdownRef.current
  );

  useHandleKeyboardHook((e) => {
    if (menuOpened) {
      const maxOptionIndex = _options.length - 1;
      if (e.key === "ArrowDown") {
        const newIndex =
          focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
        optionContainerRef.current
          .querySelector(`div[index="${newIndex}"]`)
          .scrollIntoViewIfNeeded(false);
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "ArrowUp") {
        const newIndex =
          focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
        optionContainerRef.current
          .querySelector(`div[index="${newIndex}"]`)
          .scrollIntoViewIfNeeded(true);
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "Enter") {
        const optionIndex = focusedOptionIndex;
        if (optionIndex === 0) return;
        const optionByIndex = _options[optionIndex];
        if (onChange) {
          onChange(e, getValueKey(optionByIndex), optionByIndex);
        }
        setOption(optionByIndex, optionIndex);
      }
    }
  });

  const selectOption = (e) => {
    const findOptionWrapper = (el) =>
      el.getAttribute("index") ? el : findOptionWrapper(el.parentNode);

    const optionWrapper = findOptionWrapper(e.target);
    const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
    if (optionIndex === 0) return;
    const optionByIndex = _options[optionIndex];
    if (onChange) {
      setNewOption(getLabelKey(optionByIndex));
      onChange(e, getValueKey(optionByIndex), optionByIndex);
    }
    setOption(optionByIndex, optionIndex);
  };

  const cancelSelection = (e) => {
    if (disabled) return;
    if (onChange) {
      onChange(e);
    }
    setSelectedOption(blankValue);
    setAddingNewOption(false);
    setNewOption("");
    setFocusedOptionIndex(0);
    setMenuOpened(false);
    e.stopPropagation();
  };

  const openMenu = () =>
    setMenuOpened((menuOpened) => !disabled && !menuOpened);

  const promptTextCreatorCallback = () => promptTextCreator(newOption);

  const onCreatableChange = (e) => {
    const _newOption = e.target.value;

    if (!isValidNewOption(_newOption)) {
      setShowError(true);
      setNewOption(_newOption);
      return;
    }

    const optionAllowed =
      _newOption &&
      !_options.find((option) => getLabelKey(option) === _newOption);
    setShowError(false);
    setAddingNewOption(optionAllowed);
    setNewOption(_newOption);
  };

  const newOptionCreatorCallback = () => {
    newOptionCreator(newOption);
    const newOptionObject = { label: newOption, value: newOption };
    newOptions.current.push(newOptionObject);
    setOption(newOptionObject);
    setAddingNewOption(false);
    setMenuOpened(false);
  };

  return {
    _options,
    optionContainerRef,
    dropdownRef,
    menuOpened,
    selectedOption,
    focusedOptionIndex,
    openMenu,
    showError,
    setFocusedOptionIndex,
    getValueKey,
    getLabelKey,
    selectOption,
    cancelSelection,

    newOption,
    addingNewOption,
    promptTextCreatorCallback,
    onCreatableChange,
    newOptionCreatorCallback
  };
}
