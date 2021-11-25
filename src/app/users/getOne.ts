import Users from '../../domain/users';

/**
 * function for get one user.
 */
export default ({ usersRepository }: any) => {
  const getOne = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const users = Users({ ...args });

        return usersRepository.findById(users);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    getOne,
  };
};
