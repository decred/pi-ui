import { useEffect, useState } from "react";
import { useClickOutside } from "hooks";
import { blankValue, findExact } from "./helpers";
import { useTransition } from "react-spring";

export function useSelect(
  value,
  disabled,
  options,
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
      if (searchable && onInputChange && inputValue) onInputChange("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus, searchable, inputValue, onInputChange]);

  useEffect(() => {
    if (searchable && inputValue && !showError)
      setMenuOpened(currentOptions.length > 0);
  }, [searchable, inputValue, currentOptions, showError]);

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    if (searchable && onInputChange && inputValue) onInputChange("");
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
    if (Array.isArray(value)) {
      let newSelectedOptions = [];
      if (
        value.find(
          (selectedOption) =>
            getOptionLabel(selectedOption) === getOptionLabel(option)
        )
      )
        newSelectedOptions = removeSelectedOptionFilter(option);
      else if (!value.length) {
        newSelectedOptions = [option];
      } else {
        newSelectedOptions = [...value, option];
      }
      setFocusedOptionIndex(index);
      if (searchable && onInputChange && inputValue) onInputChange("");
      onChange(newSelectedOptions);
    } else {
      resetMenu(index);
      onChange(option);
    }
  };

  const [containerRef] = useClickOutside(resetMenu);

  const selectOption = () => {
    if (!menuOpened) return;
    const optionIndex = focusedOptionIndex;
    const optionByIndex = currentOptions[optionIndex];
    if (currentOptions[optionIndex].onClick !== undefined) {
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
    if (onInputChange) onInputChange(searchValue);
  };

  const transitions = useTransition(menuOpened, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    duration: 100
  });

  const onTypeArrowDownHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = options.length - 1;
    const newIndex =
      focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeArrowUpHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = options.length - 1;
    const newIndex =
      focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeDefaultHandler = (e) => {
    if (!menuOpened) return;
    if (
      searchable &&
      !inputValue &&
      String.fromCharCode(e.keyCode).match(/(\w|\s)/g) &&
      onInputChange
    )
      onInputChange(e.key);
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
    transitions,
    currentOptions,
    setCurrentOptions,
    setOption,
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeDefaultHandler,
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
