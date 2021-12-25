/*eslint-disable*/
import { IRead, IWrite } from '../../../core/IRepository';
import IUser from '../../../core/IUser';
import toEntity from './transform';

const select = '-password -__v';

export default ({ model, jwt }: any) => {

  const getAll = async (...args: any[]) => {

    try {
      const [{ ...params }] = args;

      let query: any = {}

      if (params.search) {
          query.$or = [
            { first_name : { $regex: params.search, $options: 'i' }},
            { last_name: { $regex: params.search, $options: 'i' } },
            { email : { $regex: params.search, $options: 'i' }}
          ];
        }

      const m :IRead<any> = model;

      const users = await m.find(query)
        .select(select)
        .sort({ email: 1 });

      return users.map(user => toEntity(user));

    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  const register = async (...args: any[]) => {

    try {

      const [{ ...params }] = args;
      const m :IWrite<any> = model;
      const user = await m.create({ ...params });

      return toEntity(user);

    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const forgotPassword = async (...args: any[]) => {

      try {

        const [{ ...params }] = args;

        const { ...user }: any = await findOne(params);

        const { _id, email, password } = <IUser>user;
        const payload = { _id, email, password };
        const options = { subject: email, audience: [], expiresIn: 60 * 60 };
        const token: string = jwt.signin(options)(payload);

        const updatedUser = await update({
          _id,
          reset_password_token: token,
          reset_password_expires: Date.now() + 86400000
        });

        return toEntity(updatedUser);

    } catch (error) {
      throw new Error(error as string | undefined);
    }

  }

  const resetPassword = async (...args: any[]) => {

    try {

      const [{ ...params }] = args;

      const { ...data }: any = await findOne({
        reset_password_token: params.token,
        reset_password_expires: {
          $gt: Date.now()
        }
      });

      data.password = params.password;
      data.reset_password_token = undefined;
      data.reset_password_expires = undefined;

      await update({ ...data });

    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  const findOne = async (...args: any[]) => {

    try {

      const m :IRead<any> = model;
      const [{ ...params }] = args;
      const user = await m.findOne({ ...params })
        .select(select);

      if (!user) return null;

      return toEntity(user);

    } catch (error) {
      throw new Error(error as string | undefined);
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
      throw new Error(error as string | undefined);
    }
  }

  const update = async (...args: any) => {

    try {

      const m :IWrite<any> = model;
      const [{ _id, ...params }] = args;

      const user = await m.findByIdAndUpdate({ _id } as any,
        { ...params },
        { upsert: true, new: true })
        .select(select);

      return toEntity(user);

    } catch (error) {
      throw new Error(error as string | undefined);
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
      throw new Error(error as string | undefined);
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
