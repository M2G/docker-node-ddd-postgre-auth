import container from '../../../../container';
import get from '../../../../app/users';

export default () => {
  const {cradle} = container;
  const {
    redis,
 repository: {
   usersRepository
    }
  } = cradle;

  const getUseCase = get({redis, usersRepository});

  return {
    getUseCase
  };
};
