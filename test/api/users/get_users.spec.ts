/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const rqt: any = request(server.app);

const { usersRepository } = container.resolve('repository');

describe('Routes: POST Register', () => {
  // const BASE_URI = '/api';
  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

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
      .then(() =>
        usersRepository.register({
          username: 'test2',
          password: 'test2',
        }),
      )
      .then((user: { id: any; username: any; }) => {
        token = signIn({
          id: user.id,
          username: user.username,
        });

        console.log('token token token token', token)

        done();
      })
  });

  describe('Register user', () => {
    it('should return users list', (done) => {
      rqt
        .get(`/api/users`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err: any, res: any) => {
          expect(err).toBeFalsy();
          expect(res.body.data.length).toEqual(2);
          done(err)
        });
    });

    it('should return unauthorized if no token', (done) => {
      rqt.get(`/api/users`)
        .expect(403)
        .end((err: any, res: any) => {
          expect(err).toBeFalsy();
          expect(JSON.parse(res.text).error.false).toBeFalsy();
          expect(JSON.parse(res.text).error.message).toEqual('No token provided.');
          done();
        })
    })
  });
});
