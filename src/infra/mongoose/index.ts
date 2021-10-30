/*eslint-disable*/
import mongoose, { ConnectOptions } from 'mongoose';
import path from 'path';
import fs from 'fs';

export default ({ config, basePath, logger }: any) => {

  const configDb = { ...config.db };
  // mongodb://db:27017/root_db
  // await mongoose.connect(`mongodb://db${configDb.host}/${configDb.database}`);

  console.log('configDb', configDb)

  mongoose.connect(`mongodb://${configDb.user}:${configDb.password}@db:${configDb.host}/${configDb.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

  mongoose.connection.on('connecting', () => logger.info('database connecting'));
  mongoose.connection.on('connected', () => logger.info('database connected'));
  mongoose.connection.on('disconnecting', () => logger.info('database disconnecting'));
  mongoose.connection.on('disconnected', () => logger.info('database disconnected'));
  mongoose.connection.on('error', () => logger.error('database error'));

  const db = {
    mongoose,
    models: {}
  };

  const dir = path.join(basePath, './schemas');

  for (const files of fs.readdirSync(dir)?.filter((file) =>
    (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js'))) {

      const modelDir = path.join(dir, files);

      const models: any = require(modelDir);

     const fileName = path.parse(files).name;

    const model = models.default;


     db.models[fileName] = model({ mongoose });

    }

  return db;
};
