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
      const http: any = app.listen(config.port, () => {
        const { port } = http.address();
        logger.info(`API - Port ${port}`);
      })
    })
  }
}
