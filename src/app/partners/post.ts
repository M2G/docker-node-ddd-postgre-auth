/**
 * this file will hold all the get use-case for user domain
 */
import Partners from '../../domain/partners';

/**
 * function for creeate partners.
 */
export default ({ partnersRepository }: any) => {
  // code for getting all the items
  const register = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const partners = Partners({ ...args });

        return partnersRepository.register(partners);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    register,
  };
};
