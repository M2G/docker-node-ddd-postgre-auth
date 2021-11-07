/*eslint-disable*/
import Users from './users';
export default ({ database }: any) => {

  console.log('database database', database)

  return {
    usersRepository: Users({ model: database }),
  };

  /*const { models } = database;
  const { users } = models;
  const usersModel: any = users;

  return {
    usersRepository: Users({ model: usersModel }),
  };*/
};
