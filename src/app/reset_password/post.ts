/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for reset password user.
 */
export default ({ usersRepository }: any) => {
  const resetPassword = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.resetPassword(users);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    resetPassword,
  };
};
