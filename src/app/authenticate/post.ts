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
  const authenticate = ({ body }: any) =>
    Promise.resolve()
      .then(() => {

        const users = Users(body);

        return usersRepository?.authenticate(users);
      })
      .catch((error) => {

        console.log('sgdgsdfsdfsdfsd', error)

        throw new Error(error);
      });

  return {
    authenticate
  }
}
