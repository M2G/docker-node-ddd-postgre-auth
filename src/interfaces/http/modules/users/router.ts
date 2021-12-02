/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response, NextFunction } from 'express';

export default ({
  getOneUseCase,
  getUseCase,
  postUseCase,
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

      console.log('ALL');

     getUseCase
        .all(req, res)
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
    .post('/', (req: Request, res: Response) => {
      postUseCase
        .register({ ...req.body })
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
      putUseCase
        .update({ _id: req.params.id, ...req.body })
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
      deleteUseCase
        .remove({ _id: req.params.id })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message));
        })
    })

  return router;
};
