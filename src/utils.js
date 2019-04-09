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
