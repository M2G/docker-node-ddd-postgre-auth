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

  router.post('/', (req: any, res: any) => {
    const { body = {} } = req || {};

    postUseCase
      .authenticate({ body: body })
      .then((data: any) => {

        const { username, password } = data;

        if (!username) {
          res.status(401).json(Fail('Wrong username and password combination.'));
          return;
        }

        bcrypt.compare(body.password, password, function(err, match) {

          if (match) {
            // if user is found and password is right, create a token
            const token = jwt.sign(
              { username, password },
              process.env.SECRET as string,
              // expires in 10 hours
              { expiresIn: 60 * 60 * 10 }
              );

            console.log('::::::::', token)

            return res.status(Status.OK).json(Success({
              success: true,
              token: token
            }));
          }
          return res.status(401).json(Fail('Wrong username and password combination.'));
        });
      })
      .catch((error: { message: any }) => {
        console.log('ERROR', error)
        logger.error(error);
        res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(Status[Status.INTERNAL_SERVER_ERROR]));
      });
  });

  return router;
};
