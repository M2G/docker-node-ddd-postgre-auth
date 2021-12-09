/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for forgot password user.
 */
export default ({ usersRepository }: any) => {
  const forgotPassword = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.forgotPassword(users);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    forgotPassword,
  };
};
