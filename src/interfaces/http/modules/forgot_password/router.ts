/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response } from 'express';
import IUser from '../../../../core/IUser';

export default ({
                  postUseCase,
                  logger,
                  response: { Success, Fail },
                }: any) => {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const { body = {} } = req || {};
    const { email } = <IUser>body;

    if (!email) {
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));
    }

    try {

      const user = await postUseCase.forgotPassword({ email });

      logger.info({ ...user });
      return res.status(Status.OK).json(Success({ success: true, ...user }));

    } catch (error) {
      logger.error(error);
      return res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
      /*
      .then((data: IUser) => {
        logger.info({ ...data });
        return res.status(Status.OK).json(Success({ success: true, ...data }));
      })
      .catch((error: { message: string }) => {
        console.log('::::::::::: 2', error.message);
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });*/
  });

  return router;
};
