/*eslint-disable*/
import express from 'express';

export default ({ config, router, logger, auth }: any) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(auth.initialize())
  app.use(router);

  return {
    app,
    start: () => new Promise(() => {
      const http = app.listen(config.port, () => {
        // @ts-ignore
        const { port } = http.address()
        logger.info(`API - Port ${port}`);
      })
    })
  }
}
