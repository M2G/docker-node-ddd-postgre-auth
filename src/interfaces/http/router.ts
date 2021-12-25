import cors from 'cors';
import bodyParser from 'body-parser';
import { Router } from 'express';
import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';
// controller
import index from './modules';
import authenticate from './modules/authenticate';
import register from './modules/register';
import users from './modules/users';
import forgotPassword from './modules/forgot_password';
import resetPassword from './modules/reset_password';

const ROUTES = {
  AUTHENTICATE: '/api/authenticate',
  FORGOT_PASSWORD: '/api/forgot_password',
  INDEX: '/',
  REGISTER: '/api/register',
  RESET_PASSWORD: '/api/reset_password',
  USERS: '/api/users',
};

export default ({
 config, logger, database, verify,
}: any) => {
  const router = Router();

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }
  router
    .use(
      cors({
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: ['http://localhost:3000', 'http://localhost:3001'],
      }),
    )
    .use(bodyParser.json());

  router.use(ROUTES.INDEX, index());
  router.use(ROUTES.REGISTER, register().router);
  router.use(ROUTES.AUTHENTICATE, authenticate().router);
  router.use(ROUTES.FORGOT_PASSWORD, forgotPassword().router);
  router.use(ROUTES.RESET_PASSWORD, resetPassword().router);
  router.use(verify);
  router.use(ROUTES.USERS, users().router);

  router.use(() => ({
    ...errorHandler,
    ...[logger, config],
  }));

  return router;
};
