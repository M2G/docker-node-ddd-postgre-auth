import container from '../../../../container';
import router from './router';
import instance from './instance';

export default () => {
  const {
    jwt,
    logger,
    response: { Success, Fail },
  } = container.cradle;
  const app = instance();

  return {
    app,
    router: router({
      jwt,
      logger,
      response: { Fail, Success },
      ...app,
    }),
  };
};
