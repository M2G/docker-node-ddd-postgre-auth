/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response } from 'express';
// import { encryptPassword } from '../../../../infra/encryption';
import IUser from '../../../../core/IUser';

export default ({
  postUseCase,
  jwt,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  router.post('/', (req: Request, res: Response) => {
    const { body = {} } = req || {};
    const { email, password, username } = <IUser>body;

    if (!email || !password || !username) {
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));
    }

    // const hashedPassword = encryptPassword(password);

    postUseCase
      .register({
          email,
          password,
         // password: hashedPassword,
          username,
        })
      .then((data: IUser) => {
        const { _id, email, password } = <IUser>data;
        const payload = { _id, username, password };
        const options = { subject: email, audience: [], expiresIn: 60 * 60 };

        // if user is found and password is right, create a token
        const token: string = jwt.signin(options)(payload);

        logger.info({ token });
        return res.status(Status.OK).json(Success({ success: true, token: token }));
      })
      .catch((error: { message: string }) => {
        console.log('::::::::::: 2', error.message);
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  return router;
};
