import Users from './users';

export default ({ database, jwt }: any) => {
  console.log('jwt jwt jwt', jwt);

  const { models } = database;
  const { users } = models;
  const usersModel: any = users;

  return {
    usersRepository: Users({ jwt, model: usersModel }),
  };
};
