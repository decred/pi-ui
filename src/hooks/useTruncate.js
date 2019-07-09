import { useLayoutEffect, useMemo } from "react";
import lineClamp from "clamp-js-main";

export default function useTruncate(elementID, truncate, linesBeforeTruncate) {
  useLayoutEffect(
    function handleTruncate() {
      if (truncate) {
        const element = document.getElementById(elementID);
        if (!!element) {
          lineClamp(element, { clamp: linesBeforeTruncate });
        }
      }
    },
    [truncate, linesBeforeTruncate]
  );
}
