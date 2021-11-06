import container from '../../../../container';
import post from '../../../../app/authenticate';

export default () => {
  const { cradle } = container;
  const { repository } = cradle;
  const { usersRepository } = repository;
  const postUseCase = post({ usersRepository });

  return {
    postUseCase,
  };
};
