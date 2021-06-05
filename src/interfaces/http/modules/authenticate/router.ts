/* eslint-disable*/
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



        res.status(Status.OK).json(Success(data));
      })
      .catch((error: { message: any }) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  return router;
};
