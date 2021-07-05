/* eslint-disable */
import request from 'supertest';
import container from '../../../src/container';

const server: any = container.resolve('server');

const rqt: any = request(server.app);

const {
  usersRepository
} = container.resolve('repository');

describe('Routes: POST Users', () => {
 // const BASE_URI = '/api';
  beforeEach((done) => {
    // we need to add user before we can request our token
    usersRepository
      .destroy({ where: {} })
      .then(() =>
          usersRepository.register({
          username: 'test',
          password: 'test',
        })).then((_: any) => done())
  })

  describe('Should post users', () => {
     it('should return create user', (done) => {
       // @ts-ignore
       rqt.post(`/api/authenticate`)
         .send({
           username: 'gesdf',
           password: 'gesdf',
         })
         .expect(200)
         .end((err: any, res: any) => {
           console.log(':::::::::::::::::::::', { err,
             res })


           // expect(err).toBeFalsy();
           //  expect(res.body.data.token).toBeTruthy();
           // expect(res.body.data.success).toBeTruthy();
           done();
         })
     })

    describe('Should post users', () => {
      it('should return create user', (done) => {
        // @ts-ignore
        rqt.post(`/api/authenticate`)
          .send({
            username: 'gesdf',
            password: 'gesdf',
          })
          .expect(404)
          .end((err: any, res: any) => {
            expect(err).toBeFalsy();
            expect(res.body.success).toBeFalsy();
            expect(res.body.error).toEqual('Cannot find any user.');
            done();
          })
      })
    });


    describe('Should post users', () => {
      it('should return create user', (done) => {
        // @ts-ignore
        rqt.post(`/api/authenticate`)
          .send({
            username: '',
            password: 'gesdf',
          })
          .expect(422)
          .end((err: any, res: any) => {

            console.log('err err err', err)
/*
res.body
{
      success: false,
      date: '2021-07-05T01:13:45.817Z',
      error: 'Cannot find any user.'
    }


 */
            // expect(err).toBeFalsy();
            // expect(res.body.success).toBeFalsy();
            //expect(res.body.error).toEqual('Empty username.');
            done();
          })
      })
    });
    /* describe('Should post users', () => {
       it('should return create user', (done) => {
         // @ts-ignore
         rqt.get(`/`)
           .expect(200)
           //@ts-ignore
           .end((err, res) => {
             console.log('res', res)
             // expect(res.body.data.firstName).to.eql('John')
             // expect(res.body.data.lastName).to.eql('Doe')
             // expect(res.body.data.email).to.eql('johndoe@mgail.com.com')
             done(err)
           })
       })*/

     /*
     it('should validate user object is not complete', (done) => {
       // @ts-ignore
       request.post(`${BASE_URI}/authenticate`)
         .send({
           firstName: 'John',
           lastName: 'Doe',
           middleName: 'JohnDoe'
         })
         .expect(400)
         .end((/** @type {any} *//* err, /** @type {{ body: any; }} */ /*res) => {
          expect(res.body).to.include.keys('error')
          done(err)
        })
    })

    it('should return unauthorized if no token', (done) => {
      // @ts-ignore
      request.post(`${BASE_URI}/authenticate`)
        .expect(401)
        .end((/** @type {any} */ /*err, /** @type {{ text: any; }} */ /*res) => {
          expect(res.text).to.equals('Unauthorized')
          done(err)
        })
    })*/
  })
})
