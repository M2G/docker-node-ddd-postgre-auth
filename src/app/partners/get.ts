const KEY = 'LIST_PARTNER';
const TTL = 0.6 * 60;

/**
 * function for get users.
 */
export default ({ partnersRepository, redis }: any) => {
  const all = async () =>
     Promise.resolve()
      .then(async () => {
        const cachingPartnerList = await redis.get(KEY);

        if (cachingPartnerList) return cachingPartnerList;

        const partnerList = await partnersRepository.getAll({});

        await redis.set(KEY, JSON.stringify(partnerList), TTL);

        return partnerList;
      })
      .catch((error: string | undefined) => {
        throw new Error(error);
      });

  return {
    all,
  };
};
