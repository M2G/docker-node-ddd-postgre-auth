/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';
import { cleanData } from '../../interfaces/http/utils';

/**
 * function for authenticate user.
 */
export default ({ usersRepository }: any) => {
  const authenticate = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.authenticate(cleanData(users));
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    authenticate,
  };
};
