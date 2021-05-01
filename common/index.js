export default {
  addPrefix: (prefix, actionType) => `${prefix}/${actionType}`,

  capitalizeFirstLetter: (str = '') =>
    str.charAt(0).toUpperCase() + str.slice(1),
};
