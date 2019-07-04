import clampJS from "./vendors/clamp";
/**
 * classNames is an utility to return a concatenated string without falsy values
 * @param {String} args
 * @returns {String}
 */
export const classNames = (...args) =>
  args
    .filter(Boolean)
    .filter(isString)
    .join(" ");

export const isString = (arg) => typeof arg == "string";
export const isObject = (arg) =>
  arg && !Array.isArray(arg) && typeof arg == "object";

export const clamp = clampJS;

/**
 * Returns the prop type checking for the id of components exposing an API
 * for truncating the text
 * @param {Object} props
 * @param {string} propName
 * @param {string} componentName
 */
export const idPropTypeCheckForTruncatedComponents = (
  props,
  propName,
  componentName
) => {
  if (
    props["truncate"] === true &&
    (!props[propName] || typeof props[propName] !== "string")
  ) {
    return new Error(
      `Please provide a valid ID for ${componentName} when truncate is active`
    );
  }
};
