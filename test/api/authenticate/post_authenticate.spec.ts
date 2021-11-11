/* eslint-disable */
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
const mongod = new MongoMemoryServer();

const connect = async (): Promise<void> => {
  const mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  const mongooseOpts: any = {
    useNewUrlParser: true,
    // autoReconnect: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const close = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clear = async (): Promise<void> => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

import container from '../../../src/container';

const server: any = container.resolve('server');
const rqt: any = request(server.app);
const { usersRepository } = container.resolve('repository');



describe('Routes: POST Auth', () => {
  // const BASE_URI = '/api';
  beforeAll(async () => await connect());
  // const BASE_URI = '/api';
  beforeEach((done) => {
    // we need to add user before we can request our token
    usersRepository.register({
      email: 'test@gmail.com',
      username: 'test',
      password: '$2a$10$5DgmInxX6fJGminwlgv2jeMoO.28z0A6HXN.tBE7vhmPxo1LwTWaG',
    }).then(() => done());
  });
  afterEach(async () => await clear());
  afterAll(async () => await close());


 it('should return authenticate user',  (done) => {
     rqt.post(`/api/authenticate`)
      .send({
        email: 'test@gmail.com',
        password: 'test',
      })
       .expect(200)
      .end((err: any, res: any) => {
       expect(err).toBeFalsy();
        expect(res.body.data.token).toBeTruthy();
        expect(res.body.data.success).toBeTruthy();
        done();
      });
  });

  it('shouldnt authenticate user return error cannot find any user', (done) => {
    rqt
      .post(`/api/authenticate`)
      .send({
        email: 'test2@gmail.com',
        password: 'test',
      })
      .expect(404)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('User not found (email: test2@gmail.com).');
        done();
      });
  });

  it('shouldnt authenticate user return error empty username was sent', (done) => {
    rqt
      .post(`/api/authenticate`)
      .send({
        email: '',
        password: 'gesdf',
      })
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Empty value.');
        done();
      });
  });

  it('shouldnt authenticate user return error empty password was sent', (done) => {
    rqt
      .post(`/api/authenticate`)
      .send({
        username: 'gesdf',
        password: '',
      })
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Empty value.');
        done();
      });
  });

  it('shouldnt authenticate user return error empty body was sent', (done) => {
    rqt
      .post(`/api/authenticate`)
      .send({})
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        done();
      });
  });
});
