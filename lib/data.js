const { KHITROV_HOLIDAY_TOKEN, PRETTY_LOGGING } = process.env;

const listOfCommands = [{ command: '/start', description: 'Flags' }];

const flags = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: '1', callback_data: '1' },
        { text: '2', callback_data: '2' },
        { text: '3', callback_data: '3' },
      ],
      [
        { text: '4', callback_data: '4' },
        { text: '5', callback_data: '5' },
        { text: '6', callback_data: '6' },
      ],
    ],
  }),
};

module.exports = {
  KHITROV_HOLIDAY_TOKEN,
  PRETTY_LOGGING,
  listOfCommands,
  flags,
};
