/**
 * Returns the final value of a given theme key
 * @param {Object} theme
 * @param {String} key
 */
export const getThemeProperty = (theme, key) => {
  if (!theme[key]) {
    return new Error("Please, provide a valid color key!");
  }
  const value = theme[key];
  const regex = /^var\(--(.*)\)/gm;
  const match = regex.exec(value);

  const isVariable = match && match.length > 0;
  if (isVariable) {
    return getThemeProperty(theme, match[1]);
  }

  return value;
};
