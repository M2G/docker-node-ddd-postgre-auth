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
  const create = ({ body }: any) =>
    Promise.resolve()
      .then(() => {
        const user = new Users(body);
        return usersRepository.create(user);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
