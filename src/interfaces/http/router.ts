import cors from 'cors';
import bodyParser from 'body-parser';
import { Router } from 'express';
import hbs, { NodemailerExpressHandlebarsOptions} from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';
// controller
import index from './modules';
import authenticate from './modules/authenticate';
import register from './modules/register';
import users from './modules/users';
import forgotPassword from './modules/forgot_password';
import resetPassword from './modules/reset_password';

const email = process.env.MAILER_EMAIL_ID ?? 'auth_email_address@gmail.com';
const pass = process.env.MAILER_PASSWORD ?? 'auth_email_pass';

const smtpTransport = nodemailer.createTransport({
  auth: {
    pass,
    user: email,
  },
  service: process.env.MAILER_SERVICE_PROVIDER ?? 'Gmail',
});

const handlebarsOptions: NodemailerExpressHandlebarsOptions = {
  extName: '.html',
  viewEngine: 'handlebars',
  viewPath: path.resolve('./api/templates/'),
};

const ROUTES = {
  AUTHENTICATE: '/auth/authenticate',
  FORGOT_PASSWORD: '/auth/forgot_password',
  INDEX: '/',
  REGISTER: '/auth/register',
  RESET_PASSWORD: '/auth/reset_password',
  USERS: '/auth/users',
};

export default ({
 config, logger, database, verify,
}: any) => {
  const router = Router();

  smtpTransport.use('compile', hbs(handlebarsOptions));

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }
  router
    .use(
      cors({
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET',
'POST',
'PUT',
'DELETE'],
        origin: ['http://localhost:3000',
'http://localhost:3001',
'http://localhost:3002',
'http://localhost:3004'],
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
  // users?search=EMAIL/FIST_NAME/LAST_NAME
  router.use(() => ({
    ...errorHandler,
    ...[logger, config],
  }));

  return router;
};
