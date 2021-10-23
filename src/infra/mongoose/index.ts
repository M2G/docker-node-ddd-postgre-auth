/*eslint-disable*/
import mongoose from 'mongoose';
import userSchema from '../database/schemas/users';

export default async ({ config, logger }: any) => {
  // const configDb = { ...config.db };
  // mongodb://db:27017/root_db
  // await mongoose.connect(`mongodb://db${configDb.host}/${configDb.database}`);

  await mongoose.connect(`mongodb://db:27017/root_db`);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    logger.debug('connected to MongoDB database!');
  });

  // return mongoose;
  return userSchema({ mongoose });
};
