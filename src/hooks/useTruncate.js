import { useLayoutEffect, useMemo } from "react";
import lineClamp from "clamp-js-main";

/**
 * setStylesOnElement merges the provided styles with the target element
 * styles.
 * @param {Object} styles
 * @param {Object} element
 */
const setStylesOnElement = function(styles, element) {
  Object.assign(element.style, styles);
};

/**
 * Simple clamp handles the clampping when there is only a single line to truncate.
 * This has a better cross-browse effect.
 * @param {Object} element
 */
const simpleClamp = (element) => {
  setStylesOnElement(
    {
      overflow: "hidden",
      wordWrap: "normal",
      textOverflow: "ellipsis"
    },
    element
  );
};

export default function useTruncate(elementID, truncate, linesBeforeTruncate) {
  useLayoutEffect(
    function handleTruncate() {
      if (truncate) {
        const element = document.getElementById(elementID);
        if (!!element) {
          if (linesBeforeTruncate === 1) {
            simpleClamp(element);
          } else {
            lineClamp(element, { clamp: linesBeforeTruncate });
          }
        }
      }
    },
    [truncate, linesBeforeTruncate]
  );
}
