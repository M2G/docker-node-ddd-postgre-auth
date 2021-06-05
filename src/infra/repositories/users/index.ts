/* eslint-disable */
// const { QueryTypes } = require('sequelize');
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

    console.log('args', args)

    /*await model.query('SELECT 1', {
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