/*eslint-disable*/
import fs from 'fs';
const winston = require('winston');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

export default ({ config }: any) =>
   new winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File(
        Object.assign(config.logging, {
          filename: `logs/${config.env}.log`
        }))
    ]
  });

