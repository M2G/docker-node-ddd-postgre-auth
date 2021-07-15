/* eslint-disable*/
import bcrypt from 'bcrypt';
import Status from 'http-status';
import { Router } from 'express';
import jwt from '../../../../infra/jwt';

export default ({
  config,
  postUseCase,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  router.post('/', (req: any, res: any) => {
    const { body = {} } = req || {};
    const { username, password } = body;

    if (!username) {
      res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Empty username.'));
    }

    if (!password) {
      res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Empty password.'));
    }

    postUseCase
      .authenticate({ body: { username, password } })
      .then(async (data: any) => {

        const { id, username, password } = data || {};

        if (!username) {
          res.status(Status.NOT_FOUND).json(Fail('Wrong username and password combination.'));
          return;
        }

       const match: boolean = await bcrypt.compare(body.password, password);

          if (match) {

            const payload: { id: number, username: string, password: string } = { id, username, password };

            // if user is found and password is right, create a token
            const token: any = jwt(config).signin()(payload);

            logger.info({ token: token });
            return res.status(Status.OK).json(Success({
              success: true,
              token: token
            }));
          }

          return res.status(Status.UNAUTHORIZED).json(Fail('Wrong username and password combination.'));

      })
      .catch((error: { message: any }) => {
        console.log('catch :::: ', error)

        logger.error(error);
        res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(Status[Status.INTERNAL_SERVER_ERROR]));
      });
  });

  return router;
};
