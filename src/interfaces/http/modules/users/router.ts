/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response, NextFunction } from 'express';
import IUser from '../../../../core/IUser';
import { Types } from 'mongoose';
import { ObjectId, ObjectIdLike } from 'bson';

const isValidObjID = (id: string | number | ObjectId | Uint8Array | ObjectIdLike) => Types.ObjectId.isValid(id);

export default ({
  getOneUseCase,
  getUseCase,
  putUseCase,
  deleteUseCase,
  logger,
  response: { Success, Fail },
  auth,
}: any) => {
  const router = Router();

  router.use((req: Request, res: Response, next: NextFunction) =>
    auth.authenticate(req, res, next));

  router
    .get('/', async (req: Request, res: Response) => {
     getUseCase
        .all()
        .then((data: any) => {
          res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          res.status(Status.BAD_REQUEST).json(Fail(error.message));
        });
    });

  router
    .get('/:id', (req: Request, res: Response) => {

      const { params } = req || {};
      const { id } = params;
      if (!id)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));


      getOneUseCase
        .getOne({ _id: req.params.id })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message));
        })
    })

  router
    .put('/:id', (req: Request, res: Response) => {

      const { body = {}, params } = req || {};
      const { id } = params;
      const { email, password, username } = <IUser>body;

      if (!isValidObjID(id))
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid id parameters in request.'));

      if (!email && !password && !username)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

      putUseCase
        .update({ _id: id, ...body, modified_at: new Date().toISOString() })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message));
        })
    })

  router
    .delete('/:id', (req: Request, res: Response) => {
      const { params } = req || {};
      const { id } = params;

      if (!isValidObjID(id))
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

      deleteUseCase
        .remove({ _id: id })
        .then(() => {
          res.status(Status.OK).json(Success())
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message));
        })
    })

  return router;
};
