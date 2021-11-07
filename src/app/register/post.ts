/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for create user.
 */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const register = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users(args);

        console.log('register ok', users);

        return usersRepository.register(users);
      })
      .catch((error: string | undefined) => {
        console.log('register error', error);
        throw new Error(error);
      });

  return {
    register,
  };
};
