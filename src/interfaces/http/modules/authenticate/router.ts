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
      .then(async (data: any) => {

        const { username, password } = data;

        if (!username) {
          res.status(Status.UNAUTHORIZED).json(Fail('Wrong username and password combination.'));
          return;
        }

       const match: boolean = await bcrypt.compare(body.password, password);

          if (match) {
            // if user is found and password is right, create a token
            const token = jwt.sign({ username, password }, process.env.SECRET as string,
              // expires in 10 hours
              { expiresIn: 60 * 60 * 10 });

            logger.info({ token: token });
            return res.status(Status.OK).json(Success({
              success: true,
              token: token
            }));
          }

          return res.status(Status.UNAUTHORIZED).json(Fail('Wrong username and password combination.'));

      })
      .catch((error: { message: any }) => {
        logger.error(error);
        res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(Status[Status.INTERNAL_SERVER_ERROR]));
      });
  });

  return router;
};
