import container from 'container';
import router from './router';
import instance from './instance';

export default () => {
  const {
    logger,
    jwt,
    config,
    response: { Success, Fail },
  } = container.cradle;
  const app = instance();

  return {
    app,
    router: router({
      config,
      jwt,
      logger,
      response: { Fail, Success },
      ...app,
    }),
  };
};
