const TelegramApi = require('node-telegram-bot-api');
const { KHITROV_HOLIDAY_TOKEN: token, listOfCommands } = require('./lib/data');
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

  bot.on('message', async (msg) => {
    const { text } = msg;
    const chatId = msg.chat.id;
    const { username } = msg.chat;

    logger.info(`Request's string: ${text}; Username: ${username}; User id: ${chatId}`);

    const methodsDict = {
      '/start': 'Hi!',
    };
    const message = methodsDict[text] || `"${text}" is not a command. Please try again!`;

    return bot.sendMessage(chatId, message);
  });
};

start();
