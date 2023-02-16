const TelegramApi = require('node-telegram-bot-api');
const {
  ABSTRACT_API_KEY,
  KHITROV_HOLIDAY_TOKEN: token,
  listOfCommands,
  flags,
} = require('./lib/data');
const logger = require('./logger');
const Commands = require('./lib/commands');
const abstractApiUrlBuilder = require('./lib/abstractApiUrlBuilder');
const getCurrentDate = require('./lib/getCurrentDate');
const httpsGetJson = require('./lib/httpsGetJson');
const abstractApiResponseParser = require('./lib/abstractApiResponseParser');
const serializerArrayOfObjects = require('./lib/serializerArrayOfObjects');

const bot = new TelegramApi(token, { polling: true });
const commands = new Commands(listOfCommands);

const start = () => {
  logger.info('Bot started');

  bot
    .setMyCommands(commands.getCommands())
    .then(() => logger.info('Commands are set'))
    .catch((err) => logger.error(`Commands are not set: ${err}`));

  bot.on('message', async (requestFromChat) => {
    const { text, chat } = requestFromChat;
    const chatId = chat.id;
    const { username } = chat;

    logger.info(`Request's string: ${text}; Username: ${username}; User id: ${chatId}`);

    const methodsDict = { '/start': 'Please choose a flag!' };
    const message = methodsDict[text] || `"${text}" is not a command. Please try again!`;

    return bot.sendMessage(chatId, message, flags);
  });

  bot.on('callback_query', async (msg) => {
    const { data, message } = msg;
    const { chat } = message;
    const chatId = chat.id;

    logger.info(`Callback query data: ${data}; User id: ${chatId}`);

    const { year, month, day } = getCurrentDate();
    const url = abstractApiUrlBuilder(ABSTRACT_API_KEY, data, year, month, day);
    const json = await httpsGetJson(url).catch((error) => {
      logger.error(`Error occurred while sending request. ${error}`);
    });
    const parsedJson = abstractApiResponseParser(json);

    if (parsedJson.error) {
      logger.error(`Callback query data error: ${parsedJson.error}`);
      return bot.sendMessage(chatId, 'Response error');
    }

    if (parsedJson.amountOfHolidays === 0) {
      logger.info('Callback query data: There is no holiday today');
      return bot.sendMessage(chatId, 'There is no holiday today');
    }

    return bot.sendMessage(chatId, serializerArrayOfObjects(parsedJson.holidays));
  });
};

start();
