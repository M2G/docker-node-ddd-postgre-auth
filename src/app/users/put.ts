/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';
import { cleanData } from '../../interfaces/http/utils';

/**
 * function for update user.
 */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const update = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.update(cleanData(users));
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    update,
  };
};
