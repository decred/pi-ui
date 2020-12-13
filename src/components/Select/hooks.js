import { useEffect } from "react";

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
