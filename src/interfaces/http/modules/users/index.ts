import container from '../../../../container';
import router from './router';
import instance from './instance';

export default () => {
  const {
    logger,
    response: {Success, Fail},
    auth
  } = container.cradle;
  const app = instance();

  return {
    app,
    router: router({
      auth,
      logger,
      response: {Fail, Success},
      ...app
    })
  };
};
