/*eslint-disable*/
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import LocalStrategy from 'passport-local';
import {
  Strategy,
  ExtractJwt,
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT,
} from 'passport-jwt';
import Status from 'http-status';
import { Request, Response, NextFunction } from 'express';

/**
 * middleware to check the if auth vaid
 */

export default ({ repository: { usersRepository }, response: { Fail }, jwt }: any) => {
  // @ts-ignore
  const bearerStrategy = new BearerStrategy(
    'bearer',
    (token: any, done: (arg0: any, arg1: { email: any; password: any } | null) => any) => {
      const { email }: any | number = jwt.decode()(token);

      usersRepository
        .findOne({ email })
        .then((user: any) => {
          if (!user) return done(Status[Status.NOT_FOUND], null);
          done(null, { email: user.email, password: user.password });
        })
        .catch((error: null) => done(error, null));
    },
  );

  // @ts-ignore
  const localStrategy = new LocalStrategy(
    function (username: any, password: any, done: any) {
    console.log('LocalStrategy', { username, password });

    /*
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });*/
  });

  //@TODO try it

  /*
  passport.use(
'login',
new localStrategy(
{
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}
)
);
   */

  const JWTstrategy = require('passport-jwt').Strategy;
  const ExtractJWT = require('passport-jwt').ExtractJwt;

  //@TODO try it too
  const jwtStrategy = new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token: { user: any; }, done: (arg0: unknown, arg1: undefined) => void) => {
      try {
        console.log('JWTstrategy', token.user);
        // return done(null, token.user);
      } catch (error) {
        //done(error);
      }
    }
  );

  passport.use(jwtStrategy);
  passport.use(localStrategy);
  passport.use(bearerStrategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));

  return {
    initialize: () => passport.initialize(),
    authenticate: (req: Request, res: Response, next: NextFunction) =>
      passport.authenticate('bearer', { session: false }, (err, _) => {
        if (err === Status[Status.NOT_FOUND]) {
          return res.status(Status.NOT_FOUND).json(Fail(Status[Status.NOT_FOUND]));
        }

        if (err) {
          return res.status(Status.UNAUTHORIZED).json(Fail(Status[Status.UNAUTHORIZED]));
        }

        return next();
      })(req, res, next),
  };
};
