const KEY = 'LIST_USER';
const TTL = 1 * 60;

/**
 * function for get users.
 */
export default ({ usersRepository, redis }: any) => {
  const all = async ({ ...arg }: ArrayLike<unknown> | Record<string, unknown>) => {
    try {
      console.log('arg arg arg arg', Object.entries(arg).length);

      if (arg && Object.entries(arg).length === 0) {
        return usersRepository.getAll({ ...arg });
      }

      console.log('HERE 1');

      const cachingUserList = await redis.get(KEY);

      console.log('HERE 2', await cachingUserList);

      if (cachingUserList) return cachingUserList;

      const userList = await usersRepository.getAll({ ...arg });

      await redis.set(KEY, JSON.stringify(userList), TTL);

      return userList;
    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all,
  };
};
