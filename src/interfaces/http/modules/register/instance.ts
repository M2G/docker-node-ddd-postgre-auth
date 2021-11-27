import container from '../../../../container';
import { post } from '../../../../app/users';

export default () => {
  const { cradle } = container;
  const {
    repository: { usersRepository },
  } = cradle;

  const postUseCase = post({ usersRepository });

  return {
    postUseCase,
  };
};
