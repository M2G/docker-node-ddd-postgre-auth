/*eslint-disable*/
import express from 'express';
import jwt from 'jsonwebtoken';
import Status from 'http-status';
const router = express.Router();

router.use((req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  console.log(':::::::::::', token)

  if (token) {

    jwt.verify(token, process.env.SECRET as string, (err: any, decoded: any) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      }
      //@ts-ignore
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(Status.FORBIDDEN).send({
      success: false,
      message: 'No token provided.',
    });
  }
});

export default router;
