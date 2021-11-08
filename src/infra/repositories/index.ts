/*eslint-disable*/
import Users from './users';
export default ({ database }: any) => {
  const { models } = database;
  const { users } = models;
  const usersModel: any = users;

  return {
    usersRepository: Users({ model: usersModel }),
  };
};
