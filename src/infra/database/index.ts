/* eslint-disable */
 import mongoose from '../mongoose';
/*
export default ({ logger, config }: any) => {
  const { db = null } = config;
  if (!db) {
    logger.error('Database config file log not found, disabling database.');
    return false;
  }

  return sequelize({ config, basePath: __dirname });
};
*/

export default ({ config }: any) => {

  return mongoose({  config, basePath: __dirname });

};
