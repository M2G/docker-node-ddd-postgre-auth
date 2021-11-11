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

jest.setTimeout(20000);

describe('Routes: POST Register', () => {
  beforeAll(async () => await connect());
  // const BASE_URI = '/api';

  const BASE_URI = '/api';
  const KEY = 'LIST_USERS_TEST';

  const jwt = container.resolve('jwt') as any;
  const redis = container.resolve('redis') as any;
  const signIn = jwt.signin({ expiresIn: 0.1 * 60 });
  const signIn2 = jwt.signin();
  let token: any;
  let token2: any;
  beforeEach((done) => {

    redis.set(KEY, JSON.stringify([
      {
        "id": 1080,
        "username": "test"
      }
    ]));

    // we need to add user before we can request our token
        usersRepository.register({
          username: 'test1',
          password: 'test1',
        })
      .then((user: { id: any; username: any }) => {
        token = signIn({
          id: user.id,
          username: user.username,
        });
        token2 = signIn2({
          id: user.id,
          username: user.username,
        });

        done();
      })
  });

  afterEach(async () => await clear());
  afterAll(async () => await close());

    it('should return users list', (done) => {
      rqt
        .get(`${BASE_URI}/users`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200)
        .end((err: any, res: any) => {
          expect(err).toBeFalsy();
          expect(res.body.data.length).toEqual(1);
          done();
        });
    });

    it('should return unauthorized token invalid signature', (done) => {
      rqt
        .get(`${BASE_URI}/users`)
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM5LCJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IiQyYiQxMCRoTTBy1ONWk3OE1FUndSNDJGSVllWjVzeEtsWHFQQWtRTmxkb1VqOTdSaGs2MWRjUjRJLiIsImlhdCI6MTYyNjIyMzU3NCwiZXhwIjoxNjI2MjU5NTc0fQ.yRAM-ZuNaUoKmUWX2BmacSB7LeHg2tIHawoc5-EXXSU',
        )
        .expect(400)
        .end((err: any, res: any) => {
          expect(err).toBeFalsy();
          expect(res.success).toBeFalsy();
          expect(JSON.parse(res.text).error.success).toBeFalsy();
          expect(JSON.parse(res.text).error.message).toEqual(
            'Bad Request',
          );
          done();
        });
    });

    //@see: https://github.com/auth0/node-jsonwebtoken/issues/288
    it('should return unauthorized token is expired', (done) => {
      setTimeout(function() {
        rqt
          .get(`${BASE_URI}/users`)
        .set('Authorization', `Bearer ${token}`)
        .expect(401)
        .end((err: any, res: any) => {
          expect(err).toBeFalsy();
          expect(JSON.parse(res.text).error.success).toBeFalsy();
          expect(JSON.parse(res.text).error.message).toEqual('Failed to authenticate token is expired.');
          done(err);
        });
      }, 2500);
    });

    it('should return unauthorized if no token', (done) => {
      rqt
        .get(`${BASE_URI}/users`)
        .expect(403)
        .end((err: any, res: any) => {
          expect(err).toBeFalsy();
          expect(JSON.parse(res.text).error.false).toBeFalsy();
          expect(JSON.parse(res.text).error.message).toEqual(
            'No token provided.',
          );
          done();
        });
    });
});
