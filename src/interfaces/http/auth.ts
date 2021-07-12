/*eslint-disable*/
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import jwt from '../../infra/jwt';

/**
 * middleware to check the if auth vaid
 */

export default ({ config, repository: { usersRepository } }: any) => {

  console.log('config', config)

  // @ts-ignore
  const strategy = new BearerStrategy(
    'bearer',
    function(token: any, done: (arg0: null, arg1: null | { id: any, username: any, // @ts-ignore
      password }) => any) {


      // @ts-ignore
      const { id } = jwt(config)
        .decode()(token);

         usersRepository.findById(id)
           .then((user: any) => {
             const { id, username, password } = user;
            done(null, { id, username, password });
           })
           .catch((error: null) => {

             console.log('userRepository.findById error', error)

             done(error, null);
           })


       });

  console.log('strategy', strategy)

  passport.use(strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));

  return {
    initialize: () => {

      console.log('passport.initialize')

      return passport.initialize();
    },
    authenticate: () => {

      console.log('passport.authenticate')

      return passport.authenticate('bearer', { session: false }, function(req, res) {

        console.log('passport.authenticate passport.authenticate')

        // res.json({ id: req.user.id, username: req.user.username });
      });
    }
  }
}
