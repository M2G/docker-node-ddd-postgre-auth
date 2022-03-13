/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response } from 'express';
import IUser from 'core/IUser';
import { encryptPassword } from 'infra/encryption';

export default ({
  postUseCase,
  jwt,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const { body = {} } = req || {};
    const { email, password } = <IUser>body;

    if (!email || !password)
      return res
        .status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid parameters in request.'));

    const hasPassword = encryptPassword(password);

    try {
      const data = await postUseCase.register({
        email,
        password: hasPassword,
      });

      const payload = {
        _id: data._id,
        email: data.email,
        password: data.password,
      };
      const options = {
        subject: email,
        audience: [],
        expiresIn: 60 * 60,
      };

      const token: string = jwt.signin(options)(payload);

      logger.info({ token });
      return res
        .status(Status.OK)
        .json(Success({ success: true, token: token }));
    } catch (error: any) {
      logger.error(error);
      return res
        .status(Status.INTERNAL_SERVER_ERROR)
        .json(Fail(error.message));
    }
  });

  return router;
};
