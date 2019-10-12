import { useLayoutEffect, useState, useCallback } from "react";

export default function useLockBodyScrollOnTrue(value) {
  const [originalStyle, setOriginalStyle] = useState(null);

  const reEnableScrolling = useCallback(() => {
    if (originalStyle) {
      document.body.style.overflow = originalStyle;
      setOriginalStyle(null);
    }
  }, [originalStyle, setOriginalStyle]);

  useLayoutEffect(() => {
    // value changed to true: need to prevent the scrolling
    if (value && !originalStyle) {
      // Get original body overflow
      const originalStyle = window.getComputedStyle(document.body).overflow;
      setOriginalStyle(originalStyle);
      // Prevent scrolling on value set to true
      document.body.style.overflow = "hidden";
    } else if (!value) {
      // value changed to false, we need to set the scroll
      // style back to its original style
      reEnableScrolling();
    }
    return () => reEnableScrolling();
  }, [value, reEnableScrolling, originalStyle, setOriginalStyle]);
}
