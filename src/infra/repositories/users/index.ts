/* eslint-disable */
import toEntity from './transform';

export default ({ model }: any) => {

  const getAll = (...args: any[]) => {
    return model
      .find(...args)
      .then((entity: any) =>
           entity?.map((data: {}) => {
            return toEntity(data);
          }))
          .catch((error: any) => {
            throw new Error(error);
          });
  }

  const register = (...args: any[]) => {
    const [{ username, password, email }] = args;

    const m = new model({ username, email, password });

   return m
      .save()
      .then((data: any) => {

        console.log('data', data)

        const {
          _id,
          username,
          password
        } = data;

        return toEntity({
          _id,
          username,
          password: password,
        });

     })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  const findById = (...args: any[]) =>
    model
      .findOne({ ...args })
      .then((data: any) => {

        console.log('findById 1', data);

        // return toEntity({ ...data });
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  const authenticate = async (...args: any[]) => {
    model
      .findOne(...args)
      .then((dataValues: any) => {
        console.log('dataValues dataValues dataValues', dataValues);

        if (!dataValues || !dataValues.length) return [];

        const [{ id, username, password }] = dataValues;
        return toEntity({
          id,
          username,
          password,
        });
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  return {
    findById,
    authenticate,
    getAll,
    register,
  };
};
