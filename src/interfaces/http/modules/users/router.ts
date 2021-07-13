/* eslint-disable*/
import Status from 'http-status';
import { Router } from 'express';

export default ({
  getUseCase,
  logger,
  response: { Success, Fail },
  auth,
  app
}: any) => {
  const router = Router();

  router.use(auth.authenticate(app))

  router
    .get('/', (req: any, res: any) => {

      console.log('GET')

      getUseCase
        .all(req, res)
        .then((data: any) => {
          res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          res.status(Status.BAD_REQUEST)
            .json(Fail(error.message));
        });
    });

  return router;
};
