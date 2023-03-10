const { KHITROV_HOLIDAY_TOKEN, PRETTY_LOGGING, ABSTRACT_API_KEY } = process.env;

const listOfCommands = [{ command: '/start', description: 'Flags' }];

const flags = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: 'πΊπΈ', callback_data: 'US' },
        { text: 'π¨π¦', callback_data: 'CA' },
        { text: 'π²π½', callback_data: 'MX' },
      ],
      [
        { text: 'π«π·', callback_data: 'FR' },
        { text: 'π¬π§', callback_data: 'GB' },
        { text: 'π©πͺ', callback_data: 'DE' },
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
