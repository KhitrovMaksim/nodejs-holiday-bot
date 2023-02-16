const getCurrentDate = () => {
  const today = new Date();

  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
};

module.exports = getCurrentDate;
