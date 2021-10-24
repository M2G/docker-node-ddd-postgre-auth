/*eslint-disable*/
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import Status from 'http-status';

/**
 * middleware to check the if auth vaid
 */

export default ({
  repository: { usersRepository },
  response: { Fail },
  jwt,
}: any) => {

  // @ts-ignore
  const strategy = new BearerStrategy(
    'bearer',
    (
      token: any,
      done: (
        arg0: any,
        arg1: { id: any; username: any; password: any } | null,
      ) => any,
    ) => {
      const { id }: any | number = jwt.decode()(token);

      usersRepository
        .findByOne(id)
        .then((user: any) => {
          if (!user) {
            return done(Status[Status.NOT_FOUND], null);
          }

          const { id, username, password } = user;
          done(null, { id, username, password });
        })
        .catch((error: null) => done(error, null));
    },
  );

  passport.use(strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));

  return {
    initialize: () => passport.initialize(),
    authenticate: (req: any, res: any, next: any) =>
      passport.authenticate(
        'bearer',
        { session: false },
        (err, _) => {
          console.log('err', err);

          if (err === Status[Status.NOT_FOUND]) {
            return res
              .status(Status.NOT_FOUND)
              .json(Fail(Status[Status.NOT_FOUND]));
          }

          if (err) {
            return res
              .status(Status.UNAUTHORIZED)
              .json(Fail(Status[Status.UNAUTHORIZED]));
          }

          return next();
        },
      )(req, res, next),
  };
};
