/*eslint-disable*/
// import { IRead, IWrite } from '../../../core/IRepository';
import toEntity from './transform';

export default ({ model }: any) => {
  // const { find, findOne, create } = model as IRead<any> & IWrite<any>;

  console.log('model', model);

  const getAll = (...args: any[]) => {
    return model
      .find(...args)
      .sort({ username: 1 })
      .then((entity: any) =>
        entity?.map((data: {}) => toEntity(data)),
      )
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  const register = (...args: any[]) => {
    const [{ username, password, email }] = args;
    console.log('register', { username, password, email });

    return model
      .create({ username, password, email })
      .then((data: any) => {
        console.log('then register', data);
        return toEntity(data);
      })
      .catch((error: any) => {
        console.log('catch register', error);
        throw new Error(error);
      });
  };

  const findById = (...args: any[]) =>
    model
      .findOne({ ...args })
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  const authenticate = (...args: any[]) => {
    const [{ email }] = args;
    console.log('authenticate', { email });

    return model
      .findOne({ email })
      .then((data: any) => {
        console.log('then authenticate', data);
        return toEntity(data);
      })
      .catch((error: any) => {
        console.log('catch authenticate', error);
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
