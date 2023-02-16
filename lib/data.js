const { KHITROV_HOLIDAY_TOKEN, PRETTY_LOGGING, ABSTRACT_API_KEY } = process.env;

const listOfCommands = [{ command: '/start', description: 'Flags' }];

const flags = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: '🇺🇸', callback_data: 'US' },
        { text: '🇨🇦', callback_data: 'CA' },
        { text: '🇲🇽', callback_data: 'MX' },
      ],
      [
        { text: '🇫🇷', callback_data: 'FR' },
        { text: '🇬🇧', callback_data: 'GB' },
        { text: '🇩🇪', callback_data: 'DE' },
      ],
    ],
  }),
};

module.exports = {
  KHITROV_HOLIDAY_TOKEN,
  PRETTY_LOGGING,
  ABSTRACT_API_KEY,
  listOfCommands,
  flags,
};
