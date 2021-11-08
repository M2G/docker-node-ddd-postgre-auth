/*eslint-disable*/
import {
  //ConnectOptions,
  //connect,
  //connection,
  Schema,
  model,
  // Model,
} from 'mongoose';
import path from 'path';
import fs from 'fs';
// import IUser from '../../core/IUser';
// import * as m from '../../infra/database/schemas';

export default ({ config, basePath, logger }: any) => {


  /*console.log('m m m m', m.users({
    model,
    Schema,
  }))*/

  //const { env } = config;

  /*if (env !== 'test') {
    const configDb = { ...config.db };
    connect(
       `mongodb://${configDb.user}:${configDb.password}@db:${configDb.host}/${configDb.database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        minPoolSize: 1,
        maxPoolSize: 20,
        socketTimeoutMS: 60000,
        serverSelectionTimeoutMS: 60000,
        loggerLevel: 'error',
      } as ConnectOptions,
    );

    connection.on('connecting', () => logger.info('database connecting'));
    connection.on('connected', () => logger.info('database connected'));
    connection.on('disconnecting', () => logger.info('database disconnecting'));
    connection.on('disconnected', () => logger.info('database disconnected'));
    connection.on('error', () => logger.error('database error'));
  }*/

  const db = {
    models: {},
  };

  const dir = path.join(basePath, './schemas');

  for (const files of fs
    .readdirSync(dir)
    ?.filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== 'index.js' &&
        file.slice(-3) === '.js',
    )) {

    const modelDir = path.join(dir, files);
    const requireModel: any = require(modelDir);
    const fileName = path.parse(files).name;
    const models = requireModel.default;

    db.models[fileName] = models({
      Schema,
      model
    });

    console.log('test db',  db);
  }

  return db;

  /*

  const emailMatch = [/([a-z0-9_\-\.])+@([a-z0-9_\-\.])+\.([a-z0-9])+/i, "No email found ({VALUE})"] as [RegExp, string];

  /**
   * User schema for mangoose
   * @type {Schema}
   */

  /*
  const User = new Schema({
    email: {
      lowercase: true,
      match: emailMatch,
      maxlength: 255,
      minlength: 5,
      required: false,
      trim: true,
      type: String,
      unique: true
    },
    username: {
      maxlength: 100,
      minlength: 2,
      required: true,
      trim: true,
      type: String
    },
    password: {
      required: true,
      type: String
    }
  });

  // @ts-ignore
  const userSchemaModel: Model<IUser> = model<IUser>('User', User);

  return userSchemaModel;
*/


};
