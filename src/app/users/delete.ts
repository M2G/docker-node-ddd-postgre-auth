/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for remove user.
 */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const remove = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.remove(users);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    remove,
  };
};
