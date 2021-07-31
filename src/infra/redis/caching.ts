/*eslint-disable*/
import * as redis from 'redis';
import Status from 'http-status';

const portRedis = process.env.PORT_REDIS ?? '6379';

const redisClient = redis.createClient(portRedis);

const set = (key: string, value: any) =>
  redisClient.set(key, JSON.stringify(value));

const get = (req: any, res: any, next: any) => {
  const { params = {} } = req;
  const { id } = params;

  redisClient.get(id, (error, data) => {
    if (error) return res.status(Status.BAD_REQUEST).send(error);
    if (data !== null) return res.status(Status.OK).send(JSON.parse(data));
    else return next();
  });
}

/**
 * Returns value or null when the key is missing - See [redis get]{@link https://redis.io/commands/get}
 * @async
 * @param key - key for the value stored
 * @returns value or null when the key is missing
 */
const get2 = async (key: string):Promise<any> => {
  let result = await super.sendCommand('get', [key])

  try {
    result = JSON.parse(result)
  } catch (e) {
    // do nothing
  }
  return result;
}

/**
 * Returns 'OK' if successful
 *
 * @param key - key for the value stored
 * @param value - value to stored
 * @param ttlInSeconds - time to live in seconds
 * @returns 'OK' if successful
 */
const set2 = (key: string, value: any, ttlInSeconds?: number): Promise<any> => {
  const str =
    Array.isArray(value) || isJSON(value, true)
      ? JSON.stringify(value)
      : value

  const ttl = validatedTtl(ttlInSeconds, this.defaultTtlInS)
  if (ttl) {
    return super.sendCommand('setex', [key, ttl, str])
  }
  return super.sendCommand('set', [key, str])
}


export {
  set,
  get
}
