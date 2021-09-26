const KEY = 'LIST_USERS';
const TTL = 0.6 * 60;

/**
 * function for get users.
 */
export default ({usersRepository, redis}: any) => {
  const all = async () =>
     Promise.resolve()
      .then(async () => {
        const cachingUserList = await redis.get(KEY);

        if (cachingUserList) return cachingUserList;

        const userList = await usersRepository.getAll({
          attributes: [
            'id', 'username'
          ]
        });

        await redis.set(KEY, JSON.stringify(userList), TTL);

        return userList;
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    all
  };
};
