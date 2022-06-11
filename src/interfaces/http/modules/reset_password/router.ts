/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response } from 'express';
import { encryptPassword } from 'infra/encryption';
import { smtpTransport, template } from '../../../../nodemailer';

export default ({
                  postUseCase,
                  logger,
                  response: { Success, Fail },
                }: any) => {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const { body = {}, headers = {} } = req || {};
    const { new_password, verify_password } = <any>body;
    const { authorization } = headers;

    const extractToken = req?.headers?.authorization?.startsWith('Bearer ');
    const token = extractToken && authorization?.split(' ')?.[1];

    if (!token || !new_password || !verify_password || new_password !== verify_password) {
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));
    }

    try {

      const hashPassword = encryptPassword(verify_password);

      const user = await postUseCase.resetPassword({ password: hashPassword, token });

      const htmlToSend = template({
        name: 'test'
      });

      var data = {
        to: user.email,
        from: "sendersemail@example.com",
        subject: 'Password Reset Confirmation',
        html: htmlToSend,
      };

      smtpTransport.sendMail(data, function(error: any) {
        if (error) return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
        console.log("Successfully sent email.");
      });

      logger.info({ ...user });
      return res.status(Status.OK).json(Success({ success: true, ...user }));

    } catch (error: any) {
      logger.error(error);
      return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
    }
  });

  return router;
};
