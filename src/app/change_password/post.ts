/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for change password user.
 */
export default ({ usersRepository }: any) => {
  const changePassword = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.changePassword(users);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    changePassword,
  };
};
