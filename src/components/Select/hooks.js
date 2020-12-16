import { useEffect, useState } from "react";
import { useClickOutside } from "hooks";
import { blankValue } from "./helpers";
import { useTransition } from "react-spring";

export function useSelect(
  options,
  setOption,
  disabled,
  onInputChange,
  inputValue,
  autoFocus,
  onChange,
  searchable = true,
  error = false
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
    if (searchable && inputValue && !error) setMenuOpened(options.length > 0);
  }, [searchable, inputValue, options, error]);

  const resetMenu = (focusedIndex = 0) => {
    setFocusedOptionIndex(focusedIndex);
    setMenuOpened(false);
    if (searchable && onInputChange && inputValue) onInputChange("");
  };

  const [containerRef] = useClickOutside(resetMenu);

  const selectOption = () => {
    if (!menuOpened) return;
    const optionIndex = focusedOptionIndex;
    const optionByIndex = options[optionIndex];
    if (options[optionIndex].onClick !== undefined) {
      options[optionIndex].onClick();
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
    transitions
  };
}

export function useHandleKeyboardHookBasicParameters(
  menuOpened,
  options,
  focusedOptionIndex,
  setFocusedOptionIndex,
  inputValue,
  onInputChange,
  searchable = true
) {
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
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
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
