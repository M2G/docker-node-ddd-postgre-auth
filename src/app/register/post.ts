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
        return usersRepository.register(Users(body));
      })
      .catch((error) => {
        console.log('register register', error)
        throw new Error(error);
      });

  return {
    register
  }
}
