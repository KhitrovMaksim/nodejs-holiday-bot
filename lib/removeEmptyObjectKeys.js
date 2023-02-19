const removeEmptyObjectKeys = (object) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Object.fromEntries(Object.entries(object).filter(([, v]) => v !== ''));

module.exports = removeEmptyObjectKeys;
