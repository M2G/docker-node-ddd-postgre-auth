/*eslint-disable*/
// import { IRead, IWrite } from '../../../core/IRepository';
import toEntity from './transform';

export default async ({ model }: any) => {


  // const { find, findOne, create } = model as IRead<any> & IWrite<any>;

  const getAll = (...args: any[]) => Promise.resolve().then(() => {

    console.log(':::::::::', model)

    return model
      .find(...args)
      .sort({ username: 1 })
      .then((entity: any) => entity?.map((data: {}) => toEntity(data)))
      .catch((error: any) => {
        throw new Error(error);
      });
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

  const findById = (...args: any[]) => Promise.resolve().then(async() => {


    console.log(':::::::::', model)


    return model.findOne({ ...args })
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        throw new Error(error);
      });
  });

  const authenticate = (...args: any[]) => Promise.resolve().then(async() => {


    console.log('::::::::: model',await model())

    const m = await model()

    const [{ email }] = args;
    return m.findOne({ email })
      .then((data: any) => toEntity(data))
      .catch((error: any) => {
        throw new Error(error);
      });
  });

  return {
    findById,
    authenticate,
    getAll,
    register,
  };
};
