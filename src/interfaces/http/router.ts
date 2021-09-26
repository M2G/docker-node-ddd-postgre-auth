/*eslint-disable*/
import cors from 'cors';
import bodyParser from 'body-parser';
import { Router } from 'express';
import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';
// controller
import index from '../http/modules';
import authenticate from '../http/modules/authenticate';
import register from '../http/modules/register';
import users from '../http/modules/users';

const ROUTES = {
  INDEX: '/',
  REGISTER: '/api/register',
  AUTHENTICATE: '/api/authenticate',
  USERS: '/api/users'
};


export default ({ config, logger, database, verify }: any) => {
  // console.log('database', database);
  const router = Router();

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }
  router
    .use(cors({
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      origin: ['http://localhost:3000', 'http://localhost:3001'],
    }))
    .use(bodyParser.json());

  router.use(ROUTES.INDEX, index());
  router.use(ROUTES.REGISTER, register().router);
  router.use(ROUTES.AUTHENTICATE, authenticate().router);
  router.use(verify);
  router.use(ROUTES.USERS, users().router);

  router.use(function() {
    return {
      ...errorHandler,
    ...[logger, config]
    }
  });
  // router.use(partialRight(errorHandler, [logger, config]));


  return router;
};
