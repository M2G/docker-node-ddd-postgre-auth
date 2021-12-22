/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response } from 'express';
import IUser from 'core/IUser';
import { encryptPassword } from 'infra/encryption';

export default ({
                  postUseCase,
                  logger,
                  response: { Success, Fail },
                }: any) => {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const { body = {}, headers = {} } = req || {};
    const { new_password, verify_password } = <IUser>body;
    const { authorization } = headers;

    if (!new_password || !verify_password || new_password !== verify_password) {
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));
    }

    try {

      const hashPassword = encryptPassword(verify_password);

      const user = await postUseCase.resetPassword({ hashPassword, token: authorization?.split(' ')?.[1] });

      logger.info({ ...user });
      return res.status(Status.OK).json(Success({ success: true, ...user }));

    } catch (error) {
      logger.error(error);
      return res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  });

  return router;
};
