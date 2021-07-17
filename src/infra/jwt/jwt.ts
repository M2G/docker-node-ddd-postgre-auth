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
    const opt = Object.assign({}, options, { expiresIn: 60 * 60 } );
    return jwt.sign(payload, config.authSecret as string || 'SECRET', opt);
  },
  verify: (options?: any) => (token: string) => {
    const opt = Object.assign({}, options);
   return jwt.verify(token, config.authSecret as string || 'SECRET', opt);
  },
  decode: (options?: any) => (token: any) => {
    const opt = Object.assign({}, options);

    const decodeToken = compose(partialRight(jwt.decode, [opt] as any),
      trim,
      replace(/JWT|jwt/g, '')
    )

    return decodeToken(token);
  }
})
