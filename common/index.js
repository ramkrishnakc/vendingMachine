const CHARS = '0123456789-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default {
  addPrefix: (prefix, actionType) => `${prefix}/${actionType}`,

  capitalizeFirstLetter: (str = '') =>
    str.charAt(0).toUpperCase() + str.slice(1),

  randomString: (length, chars = CHARS) => {
    let result = '';
    for (let i = length; i > 0; i -= 1) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  },

  displayDate: date =>
    date ? new Date(date).toString().split(' GMT')[0] : '-',
};
