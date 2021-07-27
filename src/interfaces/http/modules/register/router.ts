/* eslint-disable*/
import Status from 'http-status';
import { Router } from 'express';

export default ({
  postUseCase,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  router
    .post('/', (req: any, res: any) => {
      const { body = {} } = req || {};
      const { username, password } = body;

     if (!username) {
       res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Empty username.'));
     }

      if (!password) {
        res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Empty password.'));
      }

      postUseCase
        .register({ body: body })
        .then((data: any) => {

          console.log('::::::::::: 1', data)

         return res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: string }) => {
          console.log('::::::::::: 2', error.message)
          logger.error(error);
          return res.status(Status.BAD_REQUEST).json(
            Fail(error.message));
        });
    });

  return router;
};
