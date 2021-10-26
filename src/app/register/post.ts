/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for create user.
 */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const register = async ({ body }: any) =>
    Promise.resolve()
      .then(() => {

        const { username, password } = body;

        const users = Users({ password_hash: password, username });

       return usersRepository.register(users);
      })
      .catch((error: string | undefined) => {
        console.log('register register', error);
        throw new Error(error);
      });

  return {
    register
  };
};
