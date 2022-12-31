const KEY = 'LIST_USER';
const TTL = 1 * 60;

/**
 * function for get users.
 */
export default ({ usersRepository, redis }: any) => {
  const all = async ({
    ...arg
  }: ArrayLike<unknown> | Record<string, unknown>) => {
    try {

      console.log('::::::::')

      if (arg && Object.entries(arg).length === 0) {
        return usersRepository.getAll({ ...arg });
      }

      const cachingUserList = await redis.get(KEY);

      console.log('cachingUserList', cachingUserList)

      if (cachingUserList) return cachingUserList;

      const userList = await usersRepository.getAll({ ...arg });

      console.log('userList', userList);

      await redis.set(KEY, JSON.stringify(userList), TTL);

      return userList;
    } catch (error: unknown) {
      console.log('all all all', error);

      throw new Error(error as string | undefined);
    }
  };

  return {
    all,
  };
};
