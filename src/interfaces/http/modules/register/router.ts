/* eslint-disable*/
import Status from 'http-status';
import { Router } from 'express';
import { encryptPassword } from '../../../../infra/encryption';

export default ({
  postUseCase,
  jwt,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  router.post('/', (req: any, res: any) => {
    const { body = {} } = req || {};
    const { email, password, username } = body;

    if (!email || !password || !username) {
      return res
        .status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid parameters in request.'));
    }

    const hashedPassword = encryptPassword(password);

    postUseCase
      .register({
          email,
          password: hashedPassword,
          username,
        })
      .then((data: any) => {
        const { _id, email, password } = data;

        console.log('data ::::::', data);

        const payload: {
          _id: number;
          username: string;
          password: string;
        } = { _id, username, password };

        const options = { subject: email, audience: [], expiresIn: 60 * 60 };

        // if user is found and password is right, create a token
        const token: string = jwt.signin(options)(payload);

        logger.info({ token });
        return res.status(Status.OK).json(
          Success({
            success: true,
            token: token,
          }));
      })
      .catch((error: { message: string }) => {
        console.log('::::::::::: 2', error.message);
        logger.error(error);
        return res
          .status(Status.BAD_REQUEST)
          .json(Fail(error.message));
      });
  });

  return router;
};
