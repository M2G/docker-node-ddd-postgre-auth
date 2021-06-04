import {createContainer, asValue, asFunction} from 'awilix';

import app from './app';
import server from './interfaces/http/server';
import router from './interfaces/http/router';
import auth from './interfaces/http/auth';
import config from '../config';
import jwt from './infra/jwt/jwt';
import logger from './infra/logging/logger';
import response from './infra/support/response';
import repository from './infra/repositories';
import database from './infra/database';

const container = createContainer();

// SYSTEM
container
  .register({
    app: asFunction(app).singleton(),
    auth: asFunction(auth).singleton(),
    config: asValue(config),
    database: asFunction(database).singleton(),
    jwt: asFunction(jwt).singleton(),
    logger: asFunction(logger).singleton(),
    repository: asFunction(repository).singleton(),
    response: asFunction(response).singleton(),
    router: asFunction(router).singleton(),
    server: asFunction(server).singleton()
  });

export default container;
