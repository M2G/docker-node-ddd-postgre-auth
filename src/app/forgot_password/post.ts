/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';
import { cleanData } from '../../interfaces/http/utils';
/**
 * function for forgot password user.
 */
export default ({ usersRepository }: any) => {
  const forgotPassword = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.forgotPassword(cleanData(users));
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    forgotPassword,
  };
};
