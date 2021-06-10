/* eslint-disable*/
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Status from 'http-status';
import { Router } from 'express';

export default ({
  postUseCase,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  // router.use(auth.authenticate())

  router.post('/', (req: any, res: any) => {
    const { body = {} } = req || {};

    postUseCase
      .authenticate({ body: body })
      .then((data: any) => {

        const { username, password } = data;

        if (!username) {
          // 401
          return;
        }

        bcrypt.compare(body.password, password, function(err, match) {
          if (match) {
            // if user is found and password is right, create a token
            const token = jwt.sign({ username, password }, process.env.SECRET as string, {
              expiresIn: 60*60*10  // expires in 10 hours
            });

            return res.status(Status.OK).json(Success({
              success: true,
              token: token
            }));
          } else {
            res.status(401).send('Wrong username and password combination.');
          }
        });

        console.log(':::::::: 1 ', username)


        res.status(Status.OK).json(Success(data));
      })
      .catch((error: { message: any }) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  return router;
};
