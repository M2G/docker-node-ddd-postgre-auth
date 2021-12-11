/*eslint-disable*/
import { IRead, IWrite } from '../../../core/IRepository';
import toEntity from './transform';
import { cleanData } from '../../../interfaces/http/utils';
import IUser from '../../../core/IUser';

export default ({ model, jwt }: any) => {

  const getAll = (...args: any[]) => {
    const m :IRead<any> = model;
    return m
      .find(...args)
      .select('-password -__v')
      .sort({ username: 1 })
      .then((entity: any) =>
        entity?.map((data: {}) => data))
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




  const forgotPassword = async (...args: any[]) => {

    const [{ ...params }] = args;

    console.log('--------', args);

    const { ...data }: any = await findOne(params);

    console.log('forgotPassword', cleanData(data));

    const { _id, email, password } = <IUser>data;
    const payload = { _id, email, password };
    const options = { subject: email, audience: [], expiresIn: 60 * 60 };

    // if user is found and password is right, create a token
    const token: string = jwt.signin(options)(payload);



  }

  const resetPassword = (...args: any[]) => {}

  const findOne = (...args: any[]) => {
    const m :IRead<any> = model;
    const [{ ...params }] = args;
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
    const [{ _id, ...params }] = args;

    delete params.password;

    return m
      .findByIdAndUpdate({ _id } as any, { ...params }, { new: true })
      .select('-password -__v')
      .then((data: any) => {
        return toEntity(data)
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });
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
    findOne,
    authenticate,
    resetPassword,
    forgotPassword,
    getAll,
    register,
  };
};
