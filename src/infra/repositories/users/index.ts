/* eslint-disable */
const { QueryTypes } = require('sequelize');
import toEntity from './transform';

export default ({ model }: any) => {
  const getAll = (...args: any[]) =>
    model.findAll(...args).then((entity: { dataValues: any }[]) =>
      entity?.map((data: { dataValues: any }) => {
        const { dataValues } = data || {};
        return new toEntity(dataValues);
      })
    )

  const authenticate = async (...args: any[]) => {

    const { username } = args?.[0];

    return await model.sequelize.query(`SELECT * FROM users WHERE username=:username`, { replacements: { username: username },
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: console.log,

        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: false,

        // The type of query you are executing. The query type affects how results are formatted before they are passed back.
        type: QueryTypes.SELECT
    }).then((dataValues: any) => {
      if (dataValues?.length){
        const { username, password_hash } = dataValues?.[0];
        return new toEntity({ username, password: password_hash });
      }
    }).catch((error: any) => {
      return error;
    });
  }

  const register = async (...args: any[]) => {

    console.log('args', args)

    /*const { body } = args;
    const { email } = body;
    await model.query('SELECT * FROM users WHERE email=:email', { replacements: { email } }, {
      // A function (or false) for logging your queries
      // Will get called for every SQL query that gets sent
      // to the server.
      logging: console.log,

      // If plain is true, then sequelize will only return the first
      // record of the result set. In case of false it will return all records.
      plain: false,

      // Set this to true if you don't have a model definition for your query.
      raw: false,

      // The type of query you are executing. The query type affects how results are formatted before they are passed back.
      type: QueryTypes.SELECT
    }).then(({ dataValues }: any) =>
      new toEntity(dataValues));*/
  }

  return {
    authenticate,
    getAll,
    register
  }
}
