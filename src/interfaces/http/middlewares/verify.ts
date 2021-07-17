/*eslint-disable*/
import express from 'express';

import Status from 'http-status';
const router = express.Router();

export default ({ response: { Fail }, jwt }: any) => {
  return router.use((req, res, next) => {
    const extractToken =
      req?.headers?.authorization &&
      req?.headers?.authorization.startsWith('Bearer ');

    if (extractToken) {
      const token = req?.headers?.authorization?.split(' ')[1];

      try {
        jwt.verify({ maxAge: '10h' })(token);
      } catch (e) {
        console.log('::::::::::: e e e', e.stack);

        if (e.message === 'jwt expired') {
          res.status(Status.UNAUTHORIZED).json(Fail({
            success: false,
            message: 'Failed to authenticate token is expired.'
          }));
        }

        res.status(Status.UNAUTHORIZED).json(Fail({
          success: false,
          message: 'Failed to authenticate token.'
        }));
      }

      return next();
    }

    res.status(Status.FORBIDDEN).json(Fail({
      success: false,
      message: 'No token provided.'
    }));
  });
};
