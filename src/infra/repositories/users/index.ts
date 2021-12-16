/*eslint-disable*/
import { IRead, IWrite } from '../../../core/IRepository';
import toEntity from './transform';
import { cleanData } from '../../../interfaces/http/utils';
import IUser from '../../../core/IUser';

const select = '-password -__v';

export default ({ model, jwt }: any) => {

  const getAll = async (...args: any[]) => {

    try {
      const [{ ...params }] = args;

      let query = {}

      if (params.search) {
        query = {
          $or: [
            { first_name : { $regex: params.search, $options: 'i' }},
            { last_name: { $regex: params.search, $options: 'i' } },
            { email : { $regex: params.search, $options: 'i' }}
          ]
        }
      }

      console.log('query', query)

      const m :IRead<any> = model;

      const users = await m.find(query)
        .select(select)
        .sort({ email: 1 });

      return users.map(user => toEntity(user));

    } catch (error) {
      throw new Error(error);
    }
  }

  const register = async (...args: any[]) => {

    try {

      const [{ ...params }] = args;
      const m :IWrite<any> = model;
      const user = await m.create({ ...params });

      return toEntity(user);

    } catch (error) {
      throw new Error(error);
    }
  };

  const forgotPassword = async (...args: any[]) => {

    const [{ ...params }] = args;
    const { ...data }: any = await findOne(params);

    const user = cleanData(data);
    const { _id, email, password } = <IUser>user;
    const payload = { _id, email, password };
    const options = { subject: email, audience: [], expiresIn: 60 * 60 };

    // if user is found and password is right, create a token
    const token: string = jwt.signin(options)(payload);

    const updatedUser = await update({
      _id,
      reset_password_token: token,
      reset_password_expires: Date.now() + 86400000
    });

    return toEntity(updatedUser);

  }

  const resetPassword = (...args: any[]) => {}

  const findOne = async (...args: any[]) => {

    try {

      const m :IRead<any> = model;
      const [{ ...params }] = args;
      const user = await m.findOne({ ...params })
        .select(select);

      return toEntity(user);

    } catch (error) {
      throw new Error(error);
    }
  }

  const remove = async (...args: any) => {

    try {

      const m :IWrite<any> = model;
      const [{ ...params }] = args;
      const user = await m.findByIdAndDelete({ ...params })
        .select(select);

      return toEntity(user);

    } catch (error) {
      throw new Error(error);
    }
  }

  const update = async (...args: any) => {

    try {

      const m :IWrite<any> = model;
      const [{ _id, ...params }] = args;

      console.log('UPDATE ----->', { _id, ...params });

      if (params.password) delete params.password;

      const user = await m.findByIdAndUpdate({ _id } as any,
        { ...params },
        { upsert: true, new: true })
        .select(select);

      console.log('OUT OUT update', user)

      return toEntity(user);

    } catch (error) {
      throw new Error(error);
    }
  }

  const authenticate = async (...args: any[]) => {

    try {

      const [{ ...params }] = args;
      const m :IRead<any> = model;
      const user = await m.findOne({ ...params });

      if (!user) return null;
      return toEntity(user);

    } catch (error) {

      throw new Error(error);

    }
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
