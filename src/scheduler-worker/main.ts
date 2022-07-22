import cron from 'node-cron';
import container from 'container';

const { cradle } = container;
const { redis, repository, logger } = cradle;
const { usersRepository } = repository;

const KEY = 'LAST_CONNECTED_AT:*';

function subtractMonths(numOfMonths: number, date: Date = new Date()) {
  const dateCopy = new Date(date.getTime());

  dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);

  return dateCopy;
}

async function lastConnectedUser() {
  try {
    redis.scan(KEY, (err: any, matchingKeys: any[]) => {
      if (err) throw err;
      // matchingKeys will be an array of strings if matches were found
      // otherwise it will be an empty array.
      console.log('matchingKeys', matchingKeys);
      matchingKeys?.map(async (userKey) => {
        const usersInfo = await redis.get(userKey);

        console.log('usersInfo usersInfo usersInfo usersInfo', usersInfo);
          const updatedUser = await usersRepository.update({
            _id: usersInfo?._id,
            last_connected_at: usersInfo?.last_connected_at,
          });

        console.log('updatedUser updatedUser updatedUser updatedUser', updatedUser);

          logger.info('[Users.updateLastConnectedAt] users updated in mongo', updatedUser?._id);
      });
    });
  } catch (error: unknown) {
    logger.error('[Users.updateLastConnectedAt]', error);
    throw new Error(error as string | undefined);
  }
}

async function anonymizeUser(userId): Promise<any> {
  console.log('anonymizeUser', userId);

  try {
    const user = await usersRepository.findOne(userId);

    console.log('anonymizeUser user user user user', user);

    if (!user) throw new Error('User not found');

    const userDataToUpdate = {
      address: `anonym-address${userId}`,
      deleted_at: Math.floor(Date.now() / 1000),
      email: `anonym-${userId}@unknown.fr`,
      first_name: `unnamed-${userId}`,
      last_name: `unnamed-${userId}`,
      phone: `anonym-phone-${userId}`,
      updated_at: Math.floor(Date.now() / 1000),
    };

    const updatedUser: any = await usersRepository.update({
      _id: user?._id,
      ...userDataToUpdate,
    });

    logger.info('[Users.anonymizeInactivity]', userDataToUpdate);

    logger.info(`[AnonymizeUser]: user with email ${updatedUser.email} anonymized to ${userDataToUpdate.email}`);
  } catch (error: unknown) {
    logger.error(`[AnonymizeUser]: Error while anonymizing user`);
    throw error;
  }
}

async function deleteInactiveUser() {
  try {
    logger.info('[Users.anonymizeInactivity] users anonymized successfully');

    const users: any = await usersRepository.getAll({
      last_connected_at: {
        $gt: 0,
        $lte: subtractMonths(3, new Date()).getTime(),
      },
    });

    console.log('users', users);

    await Promise.all(users?.map(async (user: { _id: any }) => {
      await anonymizeUser(user._id);
    }));
  } catch (error: unknown) {
    logger.error('[Users.anonymizeInactivity]', error);
  }
}

cron.schedule('* * * * *', () => {
  void (async () => {
    await lastConnectedUser();
    await deleteInactiveUser();
  })();
});
