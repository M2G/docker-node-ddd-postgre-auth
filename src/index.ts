import container from './container';

export const app: any = container.resolve('app');

app
  .start()
  .catch((error: any) => {
    app.logger.error(error.stack);
    process.exit();
  });
