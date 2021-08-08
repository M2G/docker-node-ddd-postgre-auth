/*eslint-disable*/

import { set, get } from '../../infra/redis';
import Users from '../../domain/users';
const KEY = 'LIST_USERS';

/**
  * function for get users.
  */
export default ({ usersRepository }: any) => {
  const all = () =>
     Promise.resolve()
      .then(async() => {

        // const cachingUserList = await get(KEY);
        // console.log('::::::::: REDIS', cachingUserList);

        // if (cachingUserList) return cachingUserList;

        const userList = usersRepository.getAll({
          attributes: [
            'id',
            'username',
          ]
        });

        const data = new Users(userList);
        console.log('data data data', await data)

        // await set(KEY, JSON.stringify(userList), 0.6 * 60);

        return userList;

      })
      .catch(error => {
        throw new Error(error);
      });

  return {
    all
  }
}
