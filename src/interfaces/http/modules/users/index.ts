import container from '../../../../container';
import router from './router';
import instance from './instance';

export default () => {
  const {logger, response: {Success, Fail}} = container.cradle;
  const app = instance();

  return {
    app,
    router: router(
      {logger, response: {Fail, Success}, ...app}
      )
  };
};
