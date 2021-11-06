/*eslint-disable*/
import Users from './users';
export default ({ database }: any) => {

  const usersModel = async () =>
  Promise.resolve()
    .then(async() => {

      const { models } = await database;
      const { users } = models;

      return users;

    });


  return {
    usersRepository: Users({ model: usersModel }),
  };
};
