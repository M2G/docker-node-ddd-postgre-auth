/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';
import { cleanData } from '../../interfaces/http/utils';

/**
 * function for remove user.
 */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const remove = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        console.log('req.params.id ', args);

        return usersRepository.remove(cleanData(users));
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    remove,
  };
};
