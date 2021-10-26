/* eslint-disable */
import toEntity from './transform';
import { comparePassword } from '../../encryption';

export default ({ model }: any) => {

  const getAll = (...args: any[]) => {
    return model
      .find(...args)
      .then((entity: any) =>
           entity?.map((data: {}) => {

            const {
              _id,
              username,
              password_hash
            } = data || {};

            return toEntity({
              _id,
              username,
              password_hash
            });
          }))
          .catch((error: any) => {
            throw new Error(error);
          });

  }

  const register = (...args: any[]) => {
    const { username, password_hash } = args;
    return model
      .insert({ username, password_hash })
      .then((data: any) => {
        const { _id, username, password_hash } = data;
        return toEntity({
          _id,
          username,
          password: password_hash,
        });
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  const findById = (...args: any[]) =>
    model
      .findByOne(...args)
      .then((dataValues: any) => {
        if (!dataValues) return [];

        const { id, username, password_hash } = dataValues;
        return toEntity({
          id,
          username,
          password: password_hash,
        });
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  /*const authenticate = async (...args: any[]) => {
    const { username } = args?.[0];

    return await model.sequelize
      .query(`SELECT * FROM users WHERE username=:username`, {
        replacements: { username },
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
        type: QueryTypes.SELECT,
      })
      .then((dataValues: any) => {
        console.log('dataValues dataValues dataValues', dataValues);

        if (!dataValues || !dataValues.length) return [];

        const { id, username, password_hash } = dataValues?.[0];
        return toEntity({
          id,
          username,
          password: password_hash,
        });
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };*/

  const validatePassword = (endcodedPassword: any) => (password: any) =>
    comparePassword(password, endcodedPassword);

  return {
    findById,
    // authenticate,
    getAll,
    register,
    validatePassword,
  };
};
