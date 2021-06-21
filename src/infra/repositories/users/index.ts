/* eslint-disable */
const { QueryTypes } = require('sequelize');
import toEntity from './transform';
const { comparePassword } = require('../../encryption');

export default ({ model }: any) => {
  const getAll = (...args: any[]) =>
    model.findAll(...args).then((entity: { dataValues: any }[]) =>
      entity?.map((data: { dataValues: any }) => {
        const { dataValues } = data || {};
        return new toEntity(dataValues);
      })).catch((error: any) => {
        return error;
    });

  const register = (...args: any[]) => {
    console.log('::::::', ...args)
   return model.create(...args)
     .then((dataValues: any) => {

       console.log('dataValues', dataValues)

       if (dataValues?.length){
         const { username, password_hash } = dataValues?.[0];
         return new toEntity({ username, password: password_hash });
       }
     }).catch((error: any) => {

       console.log('error', error)

       return error;
     });
  }

  const findById = (...args: any[]) =>
    model.findByPk(...args)
      .then(({ dataValues }: any) => toEntity(dataValues))
      .catch((error: string | undefined) => { throw new Error(error) })

  const authenticate = async (...args: any[]) => {
    const { username } = args?.[0];

    return await model.sequelize.query(`SELECT * FROM users WHERE username=:username`, { replacements: { username },
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

  const validatePassword = (endcodedPassword: any) => (password: any) =>
    comparePassword(password, endcodedPassword)

  const destroy = (...args: any[]) =>
    model.destroy(...args)

  return {
    findById,
    authenticate,
    getAll,
    register,
    validatePassword,
    destroy
  }
}
