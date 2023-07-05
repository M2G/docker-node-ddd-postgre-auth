const KEY = 'LIST_USER';
const TTL = 1 * 60;

/**
 * function for get users.
 */
export default ({ usersRepository, redis }) => {
  const all = async ({ ...arg }: ArrayLike<unknown> | Record<string, unknown>) => {
    try {
      console.log('test');

      if (arg && Object.entries(arg).length === 0) {
        return usersRepository.getAll({ ...arg });
      }

      const cachingUserList = await redis.get(KEY);

      console.log('cachingUserList', cachingUserList);

      if (cachingUserList) return cachingUserList;

      const userList = await usersRepository.getAll({ ...arg });

      console.log('test2', userList);

      await redis.set(KEY, userList, TTL);

      return userList;
    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all,
  };
};
