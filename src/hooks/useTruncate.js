import { useEffect } from "react";
import { clamp } from "../utils";

export default function useTruncate(elementID, truncate, linesBeforeTruncate) {
  useEffect(
    function handleTruncate() {
      if (truncate) {
        const element = document.getElementById(elementID);
        if (element) {
          clamp(element, { clamp: linesBeforeTruncate });
        }
      }
    },
    [truncate, linesBeforeTruncate]
  );
}
