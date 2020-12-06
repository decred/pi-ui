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
  isSearchable,

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

  const [_options, setOptions] = useState((() => {
    let __options = [...options, ...newOptions.current].filter(
      (item, pos, self) =>
        self.findIndex((_item) => getLabelKey(_item) === getLabelKey(item)) ===
        pos
    );
    __options = filterOptions ? __options.filter(filterOptions) : __options;
    __options.unshift({
      label: typeLabel || "Type to add a new option",
      value: ""
    });
    return __options;
  })());

  const previousObjects = usePrevious({ showError, newOption, addingNewOption });
  const previousShowError = previousObjects?.showError;
  const previousNewOption = previousObjects?.newOption;
  const previousAddingNewOption = previousObjects?.addingNewOption;

  const [selectedOption, setSelectedOption] = useState(
    (defaultValue &&
      _options.find((_option) => getValueKey(_option) === getValueKey(defaultValue))) ||
    blankValue
  );

  const [newOption, setNewOption] = useState(
    defaultValue ?
      getLabelKey(defaultValue) :
      ""
  );

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

  useEffect(() => {
    if (addingNewOption !== previousAddingNewOption && addingNewOption && newOption) {
      setOptions(
        (() => {
          let __options = [...options, ...newOptions.current].filter(
            (item, pos, self) =>
              self.findIndex((_item) => getLabelKey(_item) === getLabelKey(item)) ===
              pos
          );
          __options = (filterOptions ? __options.filter(filterOptions) : __options);

          if (isSearchable)
            __options = __options.filter(
              __option => getLabelKey(__option).toLowerCase()?.includes(newOption.toLowerCase())
            );
          return __options;
        })()
      );
    } else if (addingNewOption != previousAddingNewOption && !addingNewOption) {
      setOptions((() => {
        let __options = [...options, ...newOptions.current].filter(
          (item, pos, self) =>
            self.findIndex((_item) => getLabelKey(_item) === getLabelKey(item)) ===
            pos
        );
        __options = filterOptions ? __options.filter(filterOptions) : __options;
        __options.unshift({
          label: typeLabel || "Type to add a new option",
          value: ""
        });
        return __options;
      })());
    }
  }, [
    addingNewOption,
    previousAddingNewOption,
    newOption,
    options,
    getLabelKey,
    typeLabel,
    filterOptions
  ]);

  useEffect(() => {
    if (focusedOptionIndex > _options.length || focusedOptionIndex < 0)
      setFocusedOptionIndex(0);
  }, [focusedOptionIndex, _options]);

  const setOption = (option, knownIndex) => {
    const index =
      knownIndex ||
      _options.findIndex(
        (opt) =>
          getValueKey(opt) === getValueKey(option) &&
          getLabelKey(opt) === getLabelKey(option)
      );
    setNewOption(getLabelKey(option));
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

  const newOptionCreatorCallback = () => {
    newOptionCreator(newOption);
    const newOptionObject = { label: newOption, value: newOption };
    newOptions.current.push(newOptionObject);
    setOption(newOptionObject);
    setAddingNewOption(false);
  };

  useHandleKeyboardHook((e) => {
    if (menuOpened) {
      const maxOptionIndex = _options.length - 1 + (addingNewOption ? 1 : 0);
      if (e.key === "ArrowDown") {
        const newIndex =
          focusedOptionIndex === maxOptionIndex ? (!addingNewOption ? 1 : 0) : focusedOptionIndex + 1;
        if (!(optionContainerRef.current?.querySelector(`div[index="${newIndex}"]`)))
          return;
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "ArrowUp") {
        const newIndex =
          focusedOptionIndex === (!addingNewOption ? 1 : 0) ? maxOptionIndex : focusedOptionIndex - 1;
        if (!(optionContainerRef.current?.querySelector(`div[index="${newIndex}"]`)))
          return;
        setFocusedOptionIndex(newIndex);
      }
      if (e.key === "Enter") {
        let optionIndex = focusedOptionIndex;
        if (optionIndex === 0 && addingNewOption && newOption)
          newOptionCreatorCallback();
        if (optionIndex === 0) return;
        optionIndex = optionIndex - (addingNewOption ? 1 : 0);
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
    setShowError(false);
    setAddingNewOption(!!_newOption);
    setNewOption(_newOption);
    setMenuOpened(true);
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
