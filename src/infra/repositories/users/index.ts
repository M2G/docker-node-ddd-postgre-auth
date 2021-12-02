/*eslint-disable*/
import { IRead, IWrite } from '../../../core/IRepository';
import toEntity from './transform';

export default ({ model }: any) => {

  const getAll = (...args: any[]) => {
    const m :IRead<any> = model;
    return m
      .find(...args)
      .select('-password -__v')
      .sort({ username: 1 })
      .then((entity: any) =>
        entity?.map((data: {}) => toEntity(data)))
      .catch((error: any) => {
        throw new Error(error);
      });
  }

  const register = (...args: any[]) => {
    const [{ ...params }] = args;
    const m :IWrite<any> = model;
    return m
      .create({ ...params })
      .select('-password -__v')
      .then((data: any) => toEntity(data))
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  const findById = (...args: any[]) => {
    const m :IRead<any> = model;
    const [{ ...params }] = args;

    console.log('---> findById', params)

    return m
      .findOne({ ...params })
      .select('-password -__v')
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        console.log('catch', error)
        throw new Error(error);
      });
  }

  const remove = (...args: any) => {
    const m :IWrite<any> = model;
    const [{ ...params }] = args;
    return m
      .findByIdAndDelete({ ...params })
      .select('-password -__v')
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        throw new Error(error);
      });
  }

  const update = (...args: any) => {
    const m :IWrite<any> = model;
    console.log('update args', args)

    /*return m
      .findByIdAndUpdate({ ...args })
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        throw new Error(error);
      });*/
  }

  const authenticate = (...args: any[]) => {
    const [{ ...params }] = args;
    const m :IRead<any> = model;
    return m
      .findOne({ ...params })
      .then((data: any) => {
        console.log('authenticate data', data)
        if (!data) return null;
        return toEntity(data);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  return {
    remove,
    update,
    findById,
    authenticate,
    getAll,
    register,
  };
};
