/**
 * this file will hold all the get use-case for user domain
 */
import Partners from '../../domain/partners';

/**
 * function for remove partners.
 */
export default ({ partnersRepository }: any) => {
  // code for getting all the items
  const remove = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const partners = Partners({ ...args });

        return partnersRepository.remove(partners);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    remove,
  };
};
