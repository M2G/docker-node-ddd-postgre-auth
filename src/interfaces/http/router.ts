/*eslint-disable*/
import cors from 'cors';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { partialRight } from 'ramda';
import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';
// controller
import * as index from '../http/modules';
import * as authenticate from '../http/modules/authenticate';
import * as register from '../http/modules/register';
import * as users from '../http/modules/users';

export default ({ config, logger, database }: any) => {
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

  router.use('/', index.default());
  router.use('/api/register', register.default().router);
  router.use('/api/authenticate', authenticate.default().router);
  router.use('/api/users', users.default().router);
  router.use(partialRight(errorHandler, [logger, config]));

  return router;
};
