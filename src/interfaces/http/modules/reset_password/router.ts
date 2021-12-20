/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response } from 'express';
import IUser from 'core/IUser';

export default ({
                  postUseCase,
                  logger,
                  response: { Success, Fail },
                }: any) => {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const { body = {} } = req || {};
    const { newPassword, verifyPassword } = <IUser>body;

    if (!newPassword || !verifyPassword || newPassword !== verifyPassword) {
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));
    }

    try {

      const user = await postUseCase.resetPassword({ newPassword, verifyPassword });

      logger.info({ ...user });
      return res.status(Status.OK).json(Success({ success: true, ...user }));

    } catch (error) {
      logger.error(error);
      return res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  });

  return router;
};
