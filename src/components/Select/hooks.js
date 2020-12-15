import { useEffect, useState } from "react";
import { useClickOutside } from "hooks";
import { blankValue, findOptionWrapper } from "./helpers";

export function useSelect(
  options,
  setOption,
  disabled,
  onInputChange,
  inputValue,
  autoFocus,
  onChange,
  searchable = true
) {
  const [menuOpened, setMenuOpened] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  useEffect(() => {
    if (disabled) {
      setMenuOpened(false);
      if (searchable && onInputChange && inputValue) onInputChange("");
      return;
    }
    if (autoFocus) setMenuOpened(true);
  }, [disabled, autoFocus, searchable, inputValue, onInputChange]);

  useEffect(() => {
    if (searchable && inputValue) setMenuOpened(options.length > 0);
  }, [searchable, inputValue, options, menuOpened]);

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    if (searchable && onInputChange && inputValue) onInputChange("");
  };

  const [containerRef] = useClickOutside(resetMenu);

  const selectOption = (e) => {
    const optionWrapper = findOptionWrapper(e.target);
    const optionIndex = parseInt(optionWrapper.getAttribute("index"), 10);
    const optionByIndex = options[optionIndex];
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

  return {
    focusedOptionIndex,
    setFocusedOptionIndex,
    menuOpened,
    selectOption,
    openMenu,
    containerRef,
    resetMenu,
    cancelSelection,
    onSearch
  };
}

export function useHandleKeyboardHookBasicParamters(
  menuOpened,
  _options,
  focusedOptionIndex,
  setFocusedOptionIndex,
  setOption,
  inputValue,
  onInputChange,
  searchable
) {
  const onTypeArrowDownHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = _options.length - 1;
    const newIndex =
      focusedOptionIndex === maxOptionIndex ? 0 : focusedOptionIndex + 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeArrowUpHandler = () => {
    if (!menuOpened) return;
    const maxOptionIndex = _options.length - 1;
    const newIndex =
      focusedOptionIndex === 0 ? maxOptionIndex : focusedOptionIndex - 1;
    setFocusedOptionIndex(newIndex);
  };

  const onTypeEnterHandler = () => {
    if (!menuOpened) return;
    const optionIndex = focusedOptionIndex;
    const optionByIndex = _options[optionIndex];
    setOption(optionByIndex, optionIndex);
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
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeEnterHandler,
    onTypeDefaultHandler
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
