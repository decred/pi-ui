import { useEffect, useState, useCallback } from "react";

// Hook grabbed from https://usehooks.com/useKeyPress/
export default function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [setKeyPressed, targetKey]
  );

  // If released key is our target key then set to false
  const upHandler = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [setKeyPressed, targetKey]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
}
