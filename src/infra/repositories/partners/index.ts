/*eslint-disable*/
import { IRead, IWrite } from '../../../core/IRepository';
import toEntity from './transform';

export default ({ model }: any) => {

  const getAll = (...args: any[]) => {
    const m :IRead<any> = model;
    return m
      .find(...args)
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
      .then((data: any) => toEntity(data))
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  const findById = (...args: any[]) => {
    const m :IRead<any> = model;
    return m
      .findOne({ ...args })
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        throw new Error(error);
      });
  }

  const remove = (...args: any) => {
    const m :IWrite<any> = model;
    return m
      .findByIdAndDelete({ ...args })
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        throw new Error(error);
      });
  }

  const update = (...args: any) => {
    const m :IWrite<any> = model;
    return m
      .findByIdAndUpdate({ ...args })
      .then((data: any) => toEntity(data))
      .catch((error: string | undefined) => {
        throw new Error(error);
      });
  }

  const authenticate = (...args: any[]) => {
    const [{ email }] = args;
    const m :IRead<any> = model;
    return m
      .findOne({ email })
      .then((data: any) => {
        if (!data) return false;
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
