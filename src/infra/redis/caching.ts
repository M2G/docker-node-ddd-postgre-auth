/*eslint-disable*/
import * as redis from 'redis';
import Status from 'http-status';

const portRedis = process.env.PORT_REDIS ?? '6379';

const redisClient = redis.createClient(portRedis);

const set = (key: string, value: any) =>
  redisClient.set(key, JSON.stringify(value));

//@ts-ignore
const get = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  redisClient.get(id, (error, data) => {
    if (error) return res.status(Status.BAD_REQUEST).send(error);
    if (data !== null) return res.status(Status.OK).send(JSON.parse(data));
    else return next();
  });
}

export {
  set,
  get
}
