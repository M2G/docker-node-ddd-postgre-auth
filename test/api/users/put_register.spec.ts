/* eslint-disable */
import request from 'supertest';
import faker from 'faker';
import { connect, clear, close } from '../../dbHandler';
import container from '../../../src/container';

const server: any = container.resolve('server');
const rqt: any = request(server.app);
const { usersRepository } = container.resolve('repository');

jest.setTimeout(20000);

describe('Routes: PUT User', () => {
  const BASE_URI = (id: any) => `/api/users/${id}`;
  const jwt = container.resolve('jwt') as any;
  let randomUUID: any;
  const randomEmail = faker.internet.email();
  const randomUserName = faker.internet.userName();
  const randomPassword = faker.internet.password();
  const signIn = jwt.signin();
  let token: any;
  beforeAll(async () => await connect());
  beforeEach((done) => {
    // we need to add user before we can request our token
     usersRepository.register({
       email: randomEmail,
       username: randomUserName,
       password: randomPassword,
      })    .then((user: { _id: any; email: any; username: any, password: any }) => {

       randomUUID = user._id;

       token = signIn({
         _id: user._id,
         email: user.email,
         username: user.username,
         password: user.password,
       });

       done();
     })
  });

  afterEach(async () => await clear());
  afterAll(async () => await close());


  it('should return update user', (done) => {
    const randomEmail = faker.internet.email();
    const randomUserName = faker.internet.userName();
    const randomPassword = faker.internet.password();
   rqt
      .put(BASE_URI(randomUUID))
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: randomEmail,
        username: randomUserName,
        password: randomPassword,
      })
      .expect(200)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.date).toBeDefined();
        expect(res.body.success).toEqual(true);
        expect(res.body.data._id).toEqual(randomUUID.toString());
        expect(res.body.data.email).toEqual(randomEmail.toLowerCase());
        expect(res.body.data.username).toEqual(randomUserName.toLowerCase());
        expect(res.body.data.created_at).toBeDefined();
        expect(res.body.data.modified_at).toBeDefined();
        done();
      });
  });

  it('shouldnt register user return error empty values was sent', (done) => {
    rqt
      .put(BASE_URI(randomUUID))
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: '',
        username: '',
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
      .put(BASE_URI(randomUUID))
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        done();
      });
  });
});
