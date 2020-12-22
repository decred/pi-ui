import { useEffect, useState } from "react";
import { useClickOutside } from "../../hooks";
import { blankValue, DOWN, findExact, UP } from "./helpers";
import { useTransition } from "react-spring";

export function useSelect(
  value,
  disabled,
  getOptionLabel,
  getOptionValue,
  autoFocus,
  onChange,
  inputValue,
  onInputChange,
  searchable
) {
  const [currentOptions, setCurrentOptions] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      if (searchable && inputValue) onInputChange("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus, searchable, inputValue, onInputChange]);

  useEffect(() => {
    if (searchable && inputValue && !showError)
      setMenuOpened(currentOptions.length > 0);
  }, [searchable, inputValue, currentOptions, menuOpened, showError]);

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    if (searchable && inputValue) onInputChange("");
  };

  const removeSelectedOptionFilter = (option) =>
    value.filter(
      (selectedOption) =>
        getOptionLabel(selectedOption) !== getOptionLabel(option)
    );

  const setOption = (option, knownIndex) => {
    if (disabled) return;
    const index =
      knownIndex ||
      findExact(currentOptions, getOptionLabel, getOptionValue, option);
    let newOptions;
    if (Array.isArray(value)) {
      newOptions = removeSelectedOptionFilter(option);
      if (value.length === newOptions.length) {
        newOptions = [...value, option];
      }
      setFocusedOptionIndex(index);
      if (searchable && inputValue) onInputChange("");
    } else {
      newOptions = option;
      resetMenu(index);
    }
    onChange(newOptions);
  };

  const [containerRef] = useClickOutside(resetMenu);

  const selectOption = () => {
    if (!menuOpened) return;
    const optionIndex = focusedOptionIndex;
    const optionByIndex = currentOptions[optionIndex];
    if (currentOptions[optionIndex].onClick) {
      currentOptions[optionIndex].onClick();
      return;
    }
    setOption(optionByIndex, optionIndex);
  };

  const openMenu = () =>
    setMenuOpened((menuOpened) => !disabled && !menuOpened);

  const cancelSelection = (e) => {
    if (disabled) return;
    onChange(blankValue);
    resetMenu();
    e.stopPropagation();
  };

  const onSearch = (e) => {
    const searchValue = e.target.value;
    onInputChange(searchValue);
  };

  const transition = useTransition(menuOpened ? [true] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    duration: 100
  });

  const onTypeArrowHandler = (direction) => {
    if (!menuOpened) return;
    const maxOptionIndex = currentOptions.length - 1;
    let newIndex;
    if (direction === UP) {
      newIndex =
        focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
    } else {
      newIndex =
        focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
    }
    setFocusedOptionIndex(newIndex);
  };

  const onTypeArrowDownHandler = () => onTypeArrowHandler(DOWN);

  const onTypeArrowUpHandler = () => onTypeArrowHandler(UP);

  const onTypeDefaultHandler = (e) => {
    if (!menuOpened) return;
    const canLoadOptions =
      searchable &&
      !inputValue &&
      String.fromCharCode(e.keyCode).match(/(\w|\s)/g);
    if (canLoadOptions) onInputChange(e.key);
  };

  return {
    focusedOptionIndex,
    setFocusedOptionIndex,
    menuOpened,
    setMenuOpened,
    selectOption,
    openMenu,
    containerRef,
    resetMenu,
    cancelSelection,
    onSearch,
    transition,
    currentOptions,
    setCurrentOptions,
    setOption,
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeDefaultHandler,
    removeSelectedOptionFilter,
    showError,
    setShowError
  };
}

export function useHandleKeyboardHook(
  onArrowDownHandler,
  onArrowUpHandler,
  onEnterHandler,
  onTypeDefaultHandler
) {
  const handleKeyboard = (event) => {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        onArrowDownHandler(event);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        onArrowUpHandler(event);
        break;
      }
      case "Enter": {
        event.preventDefault();
        onEnterHandler(event);
        break;
      }
      default:
        if (onTypeDefaultHandler) onTypeDefaultHandler(event);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyboard);
    };
  });
}
