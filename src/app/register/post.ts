/*eslint-disable*/
/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';

/**
  * function for create user.
  */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const register = ({ body }: any) =>
    Promise.resolve()
      .then(() => {
        const { username, password } = new Users(body);
        return usersRepository.register({ username, password });
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    register
  }
}
