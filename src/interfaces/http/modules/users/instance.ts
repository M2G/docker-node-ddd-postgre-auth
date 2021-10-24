import container from '../../../../container';
import get from '../../../../app/users';

export default () => {
  const { cradle } = container;

  console.log('cradle', cradle.repository)

  const {
    redis,
    repository: { usersRepository }
  } = cradle;

  const getUseCase = get({ redis, usersRepository });

  return {
    getUseCase
  };
};
