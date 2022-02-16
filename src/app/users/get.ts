const KEY = 'LIST_USER';
const TTL = 0.6 * 60;

/**
 * function for get users.
 */
export default ({ usersRepository, redis }: any) => {
  const all = async ({ ...arg }: any) => {
    try {
      const cachingUserList = await redis.get(KEY);

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
