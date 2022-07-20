import cron from 'node-cron';
import container from 'container';

const { cradle } = container;
const { redis, repository, logger } = cradle;
const { usersRepository } = repository;

const KEY = 'LAST_CONNECTED_AT';

function subtractMonths(numOfMonths: number, date: Date = new Date()) {
  const dateCopy = new Date(date.getTime());

  dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);

  return dateCopy;
}

async function lastConnectedUser() {
  try {
  const cachingLastConnectedUser = await redis.get(KEY);

  if (!cachingLastConnectedUser) return;

  const user: any = await usersRepository.findOne(cachingLastConnectedUser?.email);

  const updatedUser = await usersRepository.update({
    _id: user?._id,
    last_connected_at: new Date(),
  });

    logger.info('[Users.updateLastConnectedAt] users updated in mongo', updatedUser?._id);

  console.log('updatedUser', updatedUser);
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
      deleted_at: Date.now(),
      email: `anonym-${userId}@unknown.fr`,
      first_name: `unnamed-${userId}`,
      last_name: `unnamed-${userId}`,
      phone: `anonym-phone-${userId}`,
      updated_at: Date.now(),
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

  // mongo
  /* await MongoDB.connect();
   const user = await MongoDB.getClient().db().collection('user').findOne({ _id: userId });

   if (!user || user === {}) {

     throw buildError.notFound('User not found');

   }
   try {

     const userDataToUpdate = {
       first_name: `unnamed-${userId}`,
       last_name: `unnamed-${userId}`,
       email: `anonym-${userId}@unknown.fr`,
       phone: `anonym-phone-${userId}`,
       address: `anonym-address${userId}`,
       updated_at: Date.now(),
       deleted_at: Date.now(),
     };

     const updated = await MongoDB.getClient().db().collection('user').update({ _id: userId }, {
       $set: userDataToUpdate,
     });

     // Selligent
     await Selligent.deleteContact(userId);

     // SIB
     await SendInBlue.deleteContact(user.email);
     logger.info(`[AnonymizeUser]: user with email ${user.email} anonymized to ${updated.email}`);

   } catch (e) {

     logger.error(`[AnonymizeUser]: Error while anonymizing user with email ${user.email}`);
     throw e;

   } */
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