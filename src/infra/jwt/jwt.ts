/*eslint-disable*/
import jwt from 'jsonwebtoken';
import {
  compose,
  trim,
  replace,
  partialRight
} from 'ramda';

export default ({ config }: any) => ({
  signin: (options?: any) => (payload: string | object | Buffer) => {

    console.log('signin config', config)

    const opt = Object.assign({}, options);
    return jwt.sign(payload, config.authSecret as string, opt);
  },
  verify: (options?: any) => (token: string) => {
    const opt = Object.assign({}, options, { ignoreExpiration: true });

    console.log('verify config', config)

   return jwt.verify(token, config.authSecret as string, opt);
  },
  decode: (options?: any) => (token: any) => {
    const opt = Object.assign({}, options);

    const decodeToken = compose(partialRight(jwt.decode, [opt] as any),
      trim,
      replace(/JWT|jwt/g, ''))

    return decodeToken(token);
  }
})
