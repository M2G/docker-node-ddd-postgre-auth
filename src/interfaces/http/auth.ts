/*eslint-disable*/
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import Status from 'http-status';
import jwt from '../../infra/jwt';

/**
 * middleware to check the if auth vaid
 */

export default ({
  config,
  repository: {usersRepository},
  response: {Fail}
}: any) => {
  // @ts-expect-error
  const strategy = new BearerStrategy('bearer', (
    token: any,
    done: (
      arg0: null,
      arg1: {id: any; username: any; password: any} | null,
    ) => any
  ) => {
    const {id}: any | number = jwt(config).decode()(token);

    usersRepository
      .findById(id)
      .then((user: any) => {
        const {id, username, password} = user;
        done(null, {id, username, password});
      })
      .catch((error: null) => done(error, null));
  });

  passport.use(strategy);
  passport.serializeUser((user, done) => { done(null, user); });
  passport.deserializeUser((user: any, done) => { done(null, user); });

  return {
    initialize: () => passport.initialize(),
    authenticate: (req: any, res: any, next: any) =>
      passport.authenticate(
        'bearer',
        {session: false},
        (err, _) => {
        if (err) {
          return res.status(Status.UNAUTHORIZED).json(Fail(Status[Status.UNAUTHORIZED]));
        }

          return next();
        }
      )(req, res, next)
  };
};
