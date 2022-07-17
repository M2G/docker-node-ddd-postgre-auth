import cron from 'node-cron';
import container from 'container';

const { cradle } = container;
const { redis, repository } = cradle;
const { usersRepository } = repository;

const KEY = 'LAST_CONNECTED_AT';

async function lastConnectedUser() {
  const cachingLastConnectedUser = await redis.get(KEY);
  console.log('running a task every minute', { cachingLastConnectedUser, usersRepository });

  const user: any = await usersRepository.findOne(cachingLastConnectedUser?.email);
  console.log('user user user', {
    _id: user?._id,
    last_connected_at: new Date(),
  });

  const updatedUser = await usersRepository.update({
    _id: user?._id,
    last_connected_at: new Date(),
  });

  console.log('updatedUser', updatedUser);
}

cron.schedule('* * * * *', () => {
  void (async () => {
    await lastConnectedUser();
  })();
});
