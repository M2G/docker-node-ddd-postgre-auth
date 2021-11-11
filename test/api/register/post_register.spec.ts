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

describe('Routes: POST Register', () => {
  beforeAll(async () => await connect());
  // const BASE_URI = '/api';
  beforeEach((done) => {
    // we need to add user before we can request our token
     usersRepository.register({
        email: "test5@hotmail.fr",
        username: 'test',
        password: 'test',
      }).then(() => done());
  });
  afterEach(async () => await clear());
  afterAll(async () => await close());


  it('should return register user', (done) => {
   rqt
      .post(`/api/register`)
      .send({
        email: "test@hotmail.fr",
        username: 'test2',
        password: 'test2',
      })
      .expect(200)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.data).toHaveProperty('success', true);
        expect(res.body.data).toHaveProperty('token');
        done();
      });
  });

  it('shouldnt register user return error empty email/username was sent', (done) => {
    rqt
      .post(`/api/register`)
      .send({
        email: "test@hotmail.fr",
        username: "test",
        password: '',
      })
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Invalid parameters in request.');
        done();
      });
  });

  it('shouldnt register user return error empty username/password was sent', (done) => {
    rqt
      .post(`/api/register`)
      .send({
        email: '',
        username: "test",
        password: 'test',
      })
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Invalid parameters in request.');
        done();
      });
  });

  it('shouldnt register user return error empty password was sent', (done) => {
    rqt
      .post(`/api/register`)
      .send({
        email: '',
        username: 'test',
        password: '',
      })
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Invalid parameters in request.');
        done();
      });
  });

  it('shouldnt authenticate user return error empty body was sent', (done) => {
    rqt
      .post(`/api/register`)
      .send({})
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        done();
      });
  });

  it('should return error duplicate registered user', (done) => {
    rqt
      .post(`/api/register`)
      .send({
        email: "test5@hotmail.fr",
        username: 'test',
        password: 'test',
      })
      .expect(400)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.error).toEqual('Error: MongoServerError: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"test5@hotmail.fr\" }');
        done();
      });
  });
});
