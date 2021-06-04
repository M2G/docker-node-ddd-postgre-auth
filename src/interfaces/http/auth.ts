/*eslint-disable*/
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * middleware to check the if auth vaid
 */

export default ({ config, repository: { userRepository } }: any) => {
  const params = {
    secretOrKey: config.authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  }

  const strategy = new Strategy(params, (payload: { id: any; }, done: (arg0: null, arg1: null) => void) => {
    userRepository.findById(payload?.id)
      .then((user: any) => done(null, user))
      .catch((error: null) => done(error, null))
  });

  console.log('strategy', strategy)

  passport.use(strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt');
    }
  }
}
