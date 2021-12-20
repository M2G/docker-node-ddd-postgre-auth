/**
 * this file will hold all the get use-case for user domain
 */
import Users from 'domain/users';

/**
 * function for reset password user.
 */
export default ({ usersRepository }: any) => {
  const resetPassword = ({ ...args }: any) => {
    try {

      console.log('::::::', args);

      // const users = Users({ ...args });

      // return usersRepository.resetPassword(users);
    } catch (error: any | unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    resetPassword,
  };
};
