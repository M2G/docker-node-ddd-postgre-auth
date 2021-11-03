/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const rqt: any = request(server.app);

const { models } = container.resolve('database')
const { usersRepository } = container.resolve('repository');

describe('Routes: POST Auth', () => {

  console.log('models', models)

  // const BASE_URI = '/api';
  beforeEach((done) => {
    // we need to add user before we can request our token
        usersRepository.register({
          email: 'test@gmail.com',
          username: 'test',
          password: 'test',
        }).then((_: any) => done());
  });

  it('should return authenticate user', (done) => {
    rqt
      .post(`/api/authenticate`)
      .send({
        email: 'test@gmail.com',
        username: 'test',
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
        username: 'gesdf',
        password: 'gesdf',
      })
      .expect(404)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Wrong username and password combination.');
        done();
      });
  });

  it('shouldnt authenticate user return error empty username was sent', (done) => {
    rqt
      .post(`/api/authenticate`)
      .send({
        username: '',
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
