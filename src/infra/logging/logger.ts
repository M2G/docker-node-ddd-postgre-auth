import fs from 'fs';

// eslint-disable-next-line
const winston = require('winston');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

export default ({config}: any) =>// eslint-disable-next-line
   new winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File(
        Object.assign(config.logging, {
          filename: `logs/${config.env}.log`
        })
      )
    ]
  });
