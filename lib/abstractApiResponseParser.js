const removeEmptyObjectKeys = require('./removeEmptyObjectKeys');

const abstractApiResponseParser = (response) => {
  if (Object.prototype.hasOwnProperty.call(response, 'error')) return { error: response.error };

  const parsedResponse = {
    error: null,
    amountOfHolidays: response.length,
    holidays: [],
  };

  if (parsedResponse.amountOfHolidays === 0) return parsedResponse;

  response.forEach((holiday) => {
    parsedResponse.holidays.push(removeEmptyObjectKeys(holiday));
  });

  return parsedResponse;
};

module.exports = abstractApiResponseParser;
