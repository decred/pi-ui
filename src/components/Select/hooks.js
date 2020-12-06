import { useRef, useCallback, useEffect } from "react";

export function useClickOutside(onClickHandler, hasNoOptions = false) {
  const ref1 = useRef();
  const ref2 = useRef();

  const handleClick = (event) => {
    if (
      (ref1.current &&
        !ref1.current.contains(event.target) &&
        ref2.current &&
        !ref2.current.contains(event.target)) ||
      hasNoOptions
    ) {
      onClickHandler();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const callbackRef = useCallback((node1, node2) => {
    ref1.current = node1;
    ref2.current = node2;
  }, []);

  return callbackRef;
}

export function useHandleKeyboardHook(onTypeHandler) {
  const handleKeyboard =
    // useCallback(
    (event) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter"
      )
        event.preventDefault();
      onTypeHandler(event);
    };
  // [onTypeHandler]
  // );

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyboard);
    };
  });
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
