import container from '../../../../container';
import { get } from '../../../../app/users';

export default () => {
  const { cradle } = container;
  const {
 repository: {
   usersRepository
    }
  } = cradle;

  const getUseCase = get({usersRepository});

  return {
    getUseCase,
  };
};
