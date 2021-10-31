/* eslint-disable*/
import bcrypt from 'bcrypt';
import Status from 'http-status';
import { Router } from 'express';

export default ({
  jwt,
  postUseCase,
  logger,
  response: { Success, Fail },
}: any) => {

  const router = Router();

  router.post('/', (req: any, res: any) => {
    const { body } = req || {};
    const { password, email } = body;

    if (!email || !password) {
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Empty value.'));
    }

    postUseCase
      .authenticate({ email })
      .then(async (data: any) => {

        const { _id, email, username, password } = data || {};

        if (!email) {
          return res.status(Status.NOT_FOUND).json(Fail(`User not found (email: ${email})`));
        }

          const match: boolean = await bcrypt.compare(body.password, password);

          if (match) {

            const payload: {
              _id: number;
              username: string;
              password: string;
              email: string;
            } = { _id, username, password, email };

            const options = { subject: email, audience: [], expiresIn: 60 * 60 };

            // if user is found and password is right, create a token
            const token: string = jwt.signin(options)(payload);

            logger.info({ token });
            return res.status(Status.OK).json(
              Success({
                success: true,
                token: token,
              }));
          }

          return res.status(Status.UNAUTHORIZED).json(Fail('Wrong username and password combination.'));

      })
      .catch((error: { message: any }) => {
        logger.error(error);
        res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(Status[Status.INTERNAL_SERVER_ERROR]));
      });
  });

  return router;
};
