/**
 * this file will hold all the get use-case for user domain
 */
import Partners from '../../domain/partners';

/**
 * function for update partners.
 */
export default ({ partnersRepository }: any) => {
  // code for getting all the items
  const update = async ({ ...args }: any) =>
    Promise.resolve()
      .then(() => {
        const partners = Partners({ ...args });

        return partnersRepository.update(partners);
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    update,
  };
};
