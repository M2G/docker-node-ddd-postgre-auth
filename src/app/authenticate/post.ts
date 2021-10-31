/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for create user.
 */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const authenticate = async ({ email }: any) =>
    Promise.resolve()
      .then(() => {
        console.log('authenticate 1', email);

        const users = Users({ email });

        return usersRepository.authenticate(users);
      })
      .catch((error: string | undefined) => {
        console.log('authenticate error', error);

        throw new Error(error);
      });

  return {
    authenticate
  };
};
