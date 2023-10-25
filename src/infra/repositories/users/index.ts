import type IUser from 'core/IUser';

import { comparePassword } from 'infra/encryption';
import { Op, UniqueConstraintError } from 'sequelize';

import toEntity from './transform';

export default ({ jwt, model }: any) => {
  const getAll = async ({
    attributes,
    filters,
    page = 1,
    pageSize = 5,
  }: {
    attributes: string[] | undefined;
    filters: string;
    page: number;
    pageSize: number;
  }): Promise<unknown> => {
    try {
      const query: {
        where: {
          [Op.or]?: [
            {
              email: {
                [Op.like]: string;
              };
            },
            {
              first_name: {
                [Op.iLike]: string;
              };
            },
            {
              last_name: {
                [Op.iLike]: string;
              };
            },
          ];
          deleted_at: number;
        };
      } = {
        where: {
          deleted_at: 0,
        },
      };

      if (filters) {
        query.where = {
          [Op.or]: [
            {
              email: {
                [Op.like]: `%${filters}%`,
              },
            },
            {
              first_name: {
                [Op.iLike]: `%${filters}%`,
              },
            },
            {
              last_name: {
                [Op.iLike]: `%${filters}%`,
              },
            },
          ],
          deleted_at: 0,
        };
      }

      console.log('query', query);

      const currPage = Number(page) || 1;

      const data = await model.findAndCountAll({
        ...query,
        attributes,
        limit: pageSize,
        nest: true,
        offset: pageSize * (currPage - 1),
        raw: true,
      });

      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      const prev = startIndex > 0 ? currPage - 1 : null;
      const next = endIndex < data.count ? currPage + 1 : null;

      return {
        pageInfo: {
          count: data.count,
          next,
          page: currPage,
          prev,
        },
        results: data?.rows ? data.rows.map((d) => toEntity({ ...d })) : [],
      };
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const register = async ({
    created_at,
    deleted_at,
    email,
    password,
  }: {
    created_at: number;
    deleted_at: number;
    email: string;
    password: string;
  }): Promise<IUser> => {
    try {
      const { dataValues } = await model.create({
        created_at,
        deleted_at,
        email,
        password,
      });

      return toEntity({ ...dataValues }) as IUser;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new Error('Duplicate error');
      }

      throw new Error(error as string | undefined);
    }
  };

  const forgotPassword = async ({ email }: { email: string }): Promise<unknown> => {
    try {
      const { dataValues } = await model.findOne({ where: { email } }, { raw: true });

      if (!dataValues) return null;

      const payload = {
        email: dataValues.email,
        id: dataValues.id,
        password: dataValues.password,
      };
      const options = {
        audience: [],
        expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME,
        subject: dataValues.email,
      };
      const token: string = jwt.signin(options)(payload);

      return update({
        id: dataValues.id,
        reset_password_expires: Date.now() + 86400000,
        reset_password_token: token,
      });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const resetPassword = async ({
    password,
    reset_password_token,
  }: {
    password: string;
    reset_password_token: string;
  }): Promise<unknown | null> => {
    try {
      const dataValues = await model.findOne(
        {
          where: {
            reset_password_expires: {
              [Op.gt]: Date.now(),
            },
            reset_password_token,
          },
        },
        { raw: true },
      );

      if (!dataValues) return null;

      dataValues.password = password;
      dataValues.reset_password_token = null;
      dataValues.reset_password_expires = Date.now();

      return update({ ...dataValues });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const findOne = async ({ id }: { id: number }): Promise<unknown | null> => {
    try {
      const data = await model.findByPk(id, { raw: true });
      if (!data) return null;
      return toEntity({ ...data });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const remove = ({ id }: { id: number }): number => {
    try {
      return model.destroy({ where: { id } });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const update = ({ id, ...params }: { id: number; params: IUser }) => {
    console.log('update update update update update', { id, ...params });
    try {
      return model.update({ ...params }, { where: { id } }, { raw: true });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const authenticate = async ({ email }: { email: string }): Promise<unknown | null> => {
    try {
      const user = await model.findOne({ where: { email } }, { raw: true });
      return toEntity(user);
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  const validatePassword = (endcodedPassword: string) => (password: string) =>
    comparePassword(password, endcodedPassword);

  const destroy = (...args: any[]) => model.destroy(...args);

  return {
    authenticate,
    destroy,
    findOne,
    forgotPassword,
    getAll,
    register,
    remove,
    resetPassword,
    update,
    validatePassword,
  };
};
