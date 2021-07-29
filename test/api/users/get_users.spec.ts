/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const rqt: any = request(server.app);

const { usersRepository } = container.resolve('repository');

describe('Routes: POST Register', () => {
  const BASE_URI = '/api';

  const jwt = container.resolve('jwt') as any;
  const signIn = jwt.signin({ expiresIn: 0 });
  let token: any;
  beforeEach((done) => {
    // we need to add user before we can request our token
    usersRepository
      .destroy({ where: {} })
      .then(() =>
        usersRepository.register({
          username: 'test1',
          password: 'test1',
        }),
      )
      .then((user: { id: any; username: any }) => {
        token = signIn({
          id: user.id,
          username: user.username,
        });
        done();
      })

  });

    it('should return users list', (done) => {
      rqt
        .get(`${BASE_URI}/users`)
        .set('Authorization', `Bearer ${token}`)
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

    it('should return unauthorized token is expired', (done) => {
      setTimeout(function() {
        rqt
          .get(`${BASE_URI}/users`)
        .set(
          'Authorization',
          `Bearer ${token}`,
        )
        .expect(401)
        .end((err: any, res: any) => {
          expect(err).toBeFalsy();
          expect(JSON.parse(res.text).error.success).toBeFalsy();
          expect(JSON.parse(res.text).error.message).toEqual('Failed to authenticate token is expired.');
          done(err);
        });
      }, 1250);
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
