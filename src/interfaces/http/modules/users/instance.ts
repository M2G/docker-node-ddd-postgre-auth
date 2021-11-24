import container from '../../../../container';
import {
 get, post, put, remove,
} from '../../../../app/users';

export default () => {
  const { cradle } = container;

  const {
    redis,
    repository: { usersRepository },
  } = cradle;

  const getUseCase = get({ redis, usersRepository });
  const postUseCase = post({ redis, usersRepository });
  const putUseCase = put({ redis, usersRepository });
  const deleteUseCase = remove({ redis, usersRepository });

  return {
    deleteUseCase,
    getUseCase,
    postUseCase,
    putUseCase,
  };
};
