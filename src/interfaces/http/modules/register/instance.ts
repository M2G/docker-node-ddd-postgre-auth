import container from '../../../../container';
import post from '../../../../app/partners';

export default () => {
  const { cradle } = container;
  const {
    repository: { partnersRepository },
  } = cradle;

  const postUseCase = post({ partnersRepository });

  return {
    postUseCase,
  };
};
