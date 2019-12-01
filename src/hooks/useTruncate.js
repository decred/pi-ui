import { useLayoutEffect } from "react";
import lineClamp from "clamp-js-main";

/**
 * setStylesOnElement merges the provided styles with the target element
 * styles.
 * @param {Object} styles
 * @param {Object} element
 */
const setStylesOnElement = (styles, element) => {
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
      display: "block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    element
  );
};

/**
 * useTruncate is a hook which will truncate the element with the provided ID.
 * It is possible to specify after how many lines the truncate effect will be
 * applied though the 'linesBeforeTruncate' parameter.
 * @param {String} elementID
 * @param {Boolean} truncate
 * @param {number} linesBeforeTruncate
 */

const useTruncate = (elementID, truncate, linesBeforeTruncate) => {
  useLayoutEffect(() => {
    if (truncate) {
      const element = document.getElementById(elementID);
      if (element) {
        if (linesBeforeTruncate === 1) {
          simpleClamp(element);
        } else {
          lineClamp.clamp
            ? lineClamp.clamp(element, { clamp: linesBeforeTruncate })
            : lineClamp(element, { clamp: linesBeforeTruncate });
        }
      }
    }
  }, [truncate, linesBeforeTruncate]);
};

export default useTruncate;
