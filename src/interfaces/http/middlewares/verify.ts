/*eslint-disable*/
import express from 'express';
import Status from 'http-status';
const router = express.Router();

const time = process.env.NODE_ENV === 'development' ?
  process.env.JWT_TOKEN_EXPIRE_TIME :
  '2s';

export default ({ response: { Fail }, jwt }: any) => {
  return router.use((req, res, next) => {
    const extractToken =
      req?.headers?.authorization &&
      req?.headers?.authorization.startsWith('Bearer ');

    if (extractToken) {
      const token = req?.headers?.authorization?.split(' ')[1];

      try {
        jwt.verify({ maxAge: time })(token);
      } catch (e) {
        console.log('::::::::::: e e e', e.name);

        if (e.name === 'TokenExpiredError') {
          return res.status(Status.UNAUTHORIZED).json(Fail({
            success: false,
            expireTime: true,
            message: 'Failed to authenticate token is expired.'
          }));
        }

        return res.status(Status.BAD_REQUEST).json(Fail({
          success: false,
          message: Status[Status.BAD_REQUEST]
        }));
      }

      return next();
    }

    return res.status(Status.FORBIDDEN).json(Fail({
      success: false,
      message: 'No token provided.'
    }));
  });
};
