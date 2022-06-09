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
    const { email } = <IUser>body;

    if (!email) {
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));
    }

    try {
      const user = await postUseCase.forgotPassword({ email });

      console.log('---------->', user)

      /*

            var data = {
        to: user.email,
        from: email,
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        context: {
          url: 'http://localhost:3000/auth/reset_password?token=' + token,
          name: user.fullName.split(' ')[0]
        }
      };

      smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        } else {
          return done(err);
        }
      });


       */

      logger.info({ ...user });
      return res.status(Status.OK).json(Success({ success: true, ...user }));

    } catch (error: any) {
      logger.error(error);
      return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
    }
  });

  return router;
};
