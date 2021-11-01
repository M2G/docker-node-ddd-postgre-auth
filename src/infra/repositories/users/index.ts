/*eslint-disable*/
import { IRead, IWrite } from '../../../core/IRepository';
import toEntity from './transform';

export default ({ model }: any) => {

  // const { find, findOne, create } = model as IRead<any> & IWrite<any>;

  const getAll = (...args: any[]) =>
    model
      .find(...args)
      .then((entity: any) => entity?.map((data: {}) => toEntity(data)))
      .catch((error: any) => {
        throw new Error(error);
      });


  const register = (...args: any[]) => {

    const [{ username, password, email }] = args;

   return model
     .create({ username, password, email })
     .then((data: any) => toEntity(data))
     .catch((error: any) => {
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

  const authenticate = async (...args: any[]) => {
    const [{ email }] = args;
    return model
      .findOne({ email })
      .then((data: any) => toEntity(data))
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
