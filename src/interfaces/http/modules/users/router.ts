/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response, NextFunction } from 'express';
import IUser from 'core/IUser';

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
    auth.authenticate(req, res, next),
  );

  router.get('/', async (req: Request, res: Response) => {
    const { query } = req;
    const { filters, pageSize, page } = query;

    try {
      const data = await getUseCase.all(
        filters ? { filters } : pageSize && page ? { pageSize, page } : {},
      );

      res.status(Status.OK).json(Success(data));
    } catch (error) {
      logger.error(error);
      res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;

    if (!id)
      return res
        .status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid id parameters in request.'));

    try {
      const data = await getOneUseCase.getOne({ id });

      console.log('data data data data', data);

      logger.debug(data);
      return res.status(Status.OK).json(Success(data));
    } catch (error: any) {
      logger.error(error);
      return res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  });

  router.post('/', async (req: Request, res: Response) => {});

  router.put('/:id', async (req: Request, res: Response) => {
    const { body = {}, params } = req;
    const { id } = params;

    const values = body && Object.entries(body).length === 0;

    console.log('values values values values values values', values);

    if (!id || values)
      return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

    try {
      const updateValue: IUser = {
        ...body,
        modified_at: Date.now(),
      };

      const data = await putUseCase.update({ id, ...updateValue });
      logger.debug(data);
      if (!data) return res.status(Status.NOT_FOUND).json(Fail());
      return res.status(Status.OK).json(Success());
    } catch (error: any) {
      logger.error(error);
      return res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;

    if (!id)
      return res
        .status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid id parameters in request.'));

    try {
      const data = await deleteUseCase.remove({ id });
      logger.debug(data);
      if (!data) return res.status(Status.NOT_FOUND).json(Fail());
      return res.status(Status.OK).json(Success());
    } catch (error: any) {
      logger.error(error);
      return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
    }
  });

  return router;
};
