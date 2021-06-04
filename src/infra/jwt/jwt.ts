/*eslint-disable*/
import jwt from 'jsonwebtoken';
import {
  compose,
  trim,
  replace,
  partialRight
} from 'ramda';

export default ({ config }: any) => ({
  signin: (options: any) => (payload: string | object | Buffer) => {
    const opt = Object.assign({}, options, { expiresIn: '1h' })
    return jwt.sign(payload, config.authSecret, opt)
  },
  verify: (options: any) => (token: string) => {
    const opt = Object.assign({}, options)
    return jwt.verify(token, config.authSecret, opt)
  },
  decode: (options: any) => (token: any) => {
    const opt = Object.assign({}, options)
    // @ts-ignore
    const decodeToken = compose(partialRight(jwt.decode, [opt]),
      trim,
      replace(/JWT|jwt/g, '')
    )

    // @ts-ignore
    return decodeToken(token);
  }
})
