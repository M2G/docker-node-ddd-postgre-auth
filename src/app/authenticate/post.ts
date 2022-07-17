/**
 * this file will hold all the get use-case for user domain
 */
import Users from 'domain/users';
import { cleanData } from 'interfaces/http/utils';

const KEY = 'LAST_CONNECTED_AT';
const TTL = 60 * 60;

/**
 * function for authenticate user.
 */
export default ({ redis, usersRepository }: any) => {
  const authenticate = async ({ ...args }: any) => {
    try {
      const users = Users({ ...args });

      console.log('AUTHENTICATE', args);

      await redis.set(KEY, JSON.stringify({ ...args, last_connected_at: new Date() }), TTL);

      return usersRepository.authenticate(cleanData(users));
    } catch (error: any | unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    authenticate,
  };
};
