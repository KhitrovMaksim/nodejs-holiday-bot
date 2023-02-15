const pino = require('pino');

const transportToConsole = pino.transport({
  target: 'pino-pretty',
  options: {
    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
    colorize: true,
  },
});

const transportToFile = pino.transport({
  target: 'pino/file',
  options: {
    destination: './log/application.log',
    mkdir: true,
  },
});

const logger = process.env.PRETTY_LOGGING === 'pino-pretty' ? pino(transportToConsole) : pino(transportToFile);

module.exports = logger;
