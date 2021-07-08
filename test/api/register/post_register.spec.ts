/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const rqt: any = request(server.app);

const { usersRepository } = container.resolve('repository');

describe('Routes: POST Register', () => {
  // const BASE_URI = '/api';
  beforeEach((done) => {
    // we need to add user before we can request our token
    usersRepository
      .destroy({ where: {} })
      .then(() =>
        usersRepository.register({
          username: 'test',
          password: 'test',
        }),
      )
      .then((_: any) => done());
  });

  it('should return authenticate user', (done) => {
    rqt
      .post(`/api/register`)
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(200)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        console.log(':::::::::::::::', { err, res })

       /* expect(err).toBeFalsy();
        expect(res.body.data.token).toBeTruthy();
        expect(res.body.data.success).toBeTruthy();*/
        done();
      });
  });

  it('shouldnt register user return error empty username was sent', (done) => {
    rqt
      .post(`/api/register`)
      .send({
        username: '',
        password: 'gesdf',
      })
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Empty username.');
        done();
      });
  });

  it('shouldnt register user return error empty password was sent', (done) => {
    rqt
      .post(`/api/register`)
      .send({
        username: 'gesdf',
        password: '',
      })
      .expect(422)
      .end((err: any, res: any) => {
        expect(err).toBeFalsy();
        expect(res.body.success).toBeFalsy();
        expect(res.body.error).toEqual('Empty password.');
        done();
      });
  });

  it('shouldnt register user return error empty body was sent', (done) => {
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
});
