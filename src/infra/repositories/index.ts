/*eslint-disable*/
import Users from './users';
export default async ({ database }: any) => {

  console.log('database database database', await database)

  const { models } = await database;

  const { users } = await models;

  const usersModel: any = await users;

  return {
    usersRepository: Users({ model: usersModel }),
  };
};
