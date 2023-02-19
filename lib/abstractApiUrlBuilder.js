const abstractApiUrlBuilder = (apiKey, countryCode, year, month, day) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `https://holidays.abstractapi.com/v1/?api_key=${apiKey}&country=${countryCode}&year=${year}&month=${month}&day=${day}`;

module.exports = abstractApiUrlBuilder;
