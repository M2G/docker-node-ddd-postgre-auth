/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';
import { cleanData } from '../../interfaces/http/utils';

/**
 * function for authenticate user.
 */
export default ({ usersRepository }: any) => {
  const authenticate = ({ ...args }: any) => {

    try {
      const users = Users({ ...args });

      const t = usersRepository.authenticate(cleanData(users));

        console.log('-----> usersRepository authenticate', t);

      return t;
    } catch (error: any | unknown) {
      throw new Error(error);
    }
  };

  return {
    authenticate,
  };
};
