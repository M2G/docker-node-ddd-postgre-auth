/* eslint-disable */
const supertest = require('supertest');

import container from '../../../container';
import { app } from '../../../index';
const { productRepository } = container.resolve('repository');

const request = supertest(app);

describe('Routes: GET roductsEntity', () => {
  const BASE_URI = `/api/product`;

  // @ts-ignore
  const signIn = container.resolve('jwt').signin();
  let token: any;

  beforeEach((done) => {
    // we need to add user before we can request our token
    productRepository
      .destroy({ where: {} })
      .then(() =>
        productRepository.create({
          product_id: 235235,
          name: 'Product 235235',
        })
      ).then(() =>
        productRepository.create({
          product_id: 235234,
          name: 'Product 235234',
        })
      ).then((product: { product_id: any; name: any; }) => {
        token = signIn({
          product_id: product.product_id,
          name: product.name,
        })
        done();
      })
  })

  describe('Should return product', () => {
    it('should return all products', (done) => {
      request.get(`${BASE_URI}/products`)
        .set('Authorization', `JWT ${token}`)
        .expect(200)
        .end((err: any, res: { body: { data: any; }; }) => {
          //@ts-ignore
          expect(res.body.data).to.have.length(2)
          done(err)
        })
    })

    it('should return unauthorized if no token', (done) => {
      request.get(`${BASE_URI}/products`)
        .expect(401)
        .end((err: any, res: { text: any; }) => {
          //@ts-ignore
          expect(res.text).to.equals('Unauthorized')
          done(err)
        })
    })
  })
})
