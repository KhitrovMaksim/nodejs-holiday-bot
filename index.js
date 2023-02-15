const TelegramApi = require('node-telegram-bot-api');
const { KHITROV_HOLIDAY_TOKEN: token, listOfCommands, flags } = require('./lib/data');
const logger = require('./logger');
const Commands = require('./lib/commands');

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

    const methodsDict = {
      '/start': 'Please choose a flag!',
    };
    const message = methodsDict[text] || `"${text}" is not a command. Please try again!`;

    return bot.sendMessage(chatId, message, flags);
  });

  bot.on('callback_query', async (msg) => {
    const { data, message } = msg;
    const { chat } = message;
    const chatId = chat.id;
    logger.info(`Callback query data: ${data}; User id: ${chatId}`);
  });
};

start();
