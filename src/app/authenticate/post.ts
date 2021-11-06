/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
 * function for create user.
 */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const authenticate = ({ email }: any) =>
    Promise.resolve()
      .then(async () => {

        const { authenticate } = await usersRepository;

        console.log('authenticate 1', authenticate);

        const users = Users({ email });

        return authenticate(users);

        // return usersRepository.authenticate(users);
      })
      .catch((error: string | undefined) => {
        console.log('authenticate error', error);

        throw new Error(error);
      });

  return {
    authenticate,
  };
};
