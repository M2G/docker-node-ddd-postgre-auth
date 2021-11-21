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
        const users = Users({ ...args });

        return usersRepository.register(users);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    register,
  };
};
