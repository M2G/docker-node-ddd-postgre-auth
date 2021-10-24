/*eslint-disable*/
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

export default ({ config, basePath }: any) => {

  const configDb = { ...config.db };
  // mongodb://db:27017/root_db
  // await mongoose.connect(`mongodb://db${configDb.host}/${configDb.database}`);

  console.log('configDb', configDb)


  mongoose.connect(`mongodb://${configDb.user}:${configDb.password}@db:${configDb.host}/${configDb.database}`);

  const con = mongoose.connection;
  con.on('error', console.error.bind(console, 'connection error:'));
  con.once('open', () => console.log('connected to MongoDB database!'));

  const db = {
    mongoose,
    models: {}
  }

  const dir = path.join(basePath, './schemas');

  for (const files of fs.readdirSync(dir)
    ?.filter((file) =>
      (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js')
    )) {

      const modelDir = path.join(dir, files);

      const models: any = require(modelDir);

     const fileName = path.parse(files).name;

    const model = models.default;


     db.models[fileName] = model({ mongoose });

    }

  return db;
};
