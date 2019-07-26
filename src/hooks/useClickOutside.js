import { useRef, useCallback, useEffect } from "react";

export default function useClickOutside(onClickHandler) {
  const ref = useRef();
  const handleClick = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickHandler();
      }
    },
    [onClickHandler, ref.current]
  );

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const callbackRef = useCallback((node) => {
    ref.current = node;
  }, []);

  return [callbackRef];
}
