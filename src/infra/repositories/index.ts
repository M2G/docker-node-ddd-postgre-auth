/*eslint-disable*/
import Users from './users'
export default ({ database }: any) => {

 const { models } = database;

  // console.log('database database database database', models)

  const {
    users,
   } = models;

  const usersModel: any = users;

  return {
    usersRepository: Users({ model: usersModel }),
  };
};
