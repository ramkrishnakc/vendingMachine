export const capitalizeFirstLetter = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const addPrefix = (prefix, actualString) => `${prefix}/${actualString}`;
