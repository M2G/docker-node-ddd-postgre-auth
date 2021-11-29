import Users from '../../domain/users';
import { cleanData } from '../../interfaces/http/utils';

/**
 * function for get one user.
 */
export default ({ usersRepository }: any) => {
  const getOne = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.findById(cleanData(users));
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    getOne,
  };
};
