/*eslint-disable*/
import * as redis from 'redis';
import Status from 'http-status';
import validatedTtl from './validatedTtl';

const portRedis = process.env.PORT_REDIS ?? '6379';

const redisClient = redis.createClient(portRedis);

let defaultTtlInS = validatedTtl(null);

/*
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
*/
/**
 * Return the defaultTtlInS
 * @returns defaultTtlInS
 */
function getDefaultTtlInS(): number | undefined {
  return defaultTtlInS
}

/**
 * Sets the defaultTtlInS
 * @param ttl
 * @returns defaultTtlInS
 */
function setDefaultTtlInS(ttl: number): number | undefined {
  defaultTtlInS = validatedTtl(ttl)
  return defaultTtlInS
}

/**
 * Unsets the defaultTtlInS
 * @param ttl
 * @returns true
 */
function unsetDefaultTtlInS(): boolean {
  defaultTtlInS = undefined
  return true
}

/**
 * Returns 'PONG'
 *
 * @param str - string passed
 * @returns 'PONG'/string passed
 */
function ping(str?: string | any): boolean {
  return redisClient.ping(str ? str : []);
}

/**
 * Returns value or null when the key is missing - See [redis get]{@link https://redis.io/commands/get}
 * @async
 * @param key - key for the value stored
 * @returns value or null when the key is missing
 */
const get = async (key: string):Promise<any> => {
  let result = await redisClient.get(key);

  try {
    result = JSON.parse(result);
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
function set(key: string, value: any, ttlInSeconds?: number): boolean {
  const str =
    Array.isArray(value)
      ? JSON.stringify(value)
      : value;

  const ttl = validatedTtl(ttlInSeconds, defaultTtlInS);
  if (ttl) {
    return redisClient.setex(key, ttl, str);
  }
  return super.set(key, str);
}

/**
 * Returns 'OK' if successful
 * @async
 * @param key          - key for the value stored
 * @param value        - value to stored
 * @param ttlInSeconds - time to live in seconds
 * @returns
 */
async function getset(
  key: string,
  value: any,
  ttlInSeconds: number | undefined
): Promise<any> {
  const str =
    Array.isArray(value)
      ? JSON.stringify(value)
      : value
  const ttl = validatedTtl(ttlInSeconds, defaultTtlInS)

  let result = await redisClient.getset(key, str);
  try {
    result = JSON.parse(result)
  } catch (e) {
    // do nothing
  }

  if (ttl) {
    await redisClient.expire(key, ttl);
  }
  return result;
}

/**
 * Returns the number of keys that were removed - See [redis del]{@link https://redis.io/commands/del}
 *
 * @param keys - list of keys to delete
 * @returns The number of keys that were removed.
 */
function del(keys: string[] = []): boolean {
  return redisClient.del(keys);
}

/**
 * Returns 1 if the timeout was set/ 0 if key does not exist or the timeout could not be set - See [redis expire]{@link https://redis.io/commands/expire}
 *
 * @param   {string}  key          - key to set expire
 * @param   {number}  ttlInSeconds - time to live in seconds
 * @returns 1 if the timeout was set successfully; if not 0
 */
function expire(key: string, ttlInSeconds: number): boolean {
  const ttl = validatedTtl(ttlInSeconds)
  return redisClient.expire(key, <number>ttl);
}

/**
 * Returns TTL in seconds, or a negative value in order to signal an error - See [redis ttl]{@link https://redis.io/commands/ttl}
 *
 * @param key - list of keys to delete
 * @returns TTL in seconds, or a negative value in order to signal an error
 */
function getTtl(key: string): boolean {
  return redisClient.ttl(key);
}

/**
 * Returns all keys matching pattern - See [redis keys]{@link https://redis.io/commands/keys}
 *
 * @param pattern - glob-style patterns/default '*'
 * @returns all keys matching pattern
 */
function keys(pattern = '*'): boolean {
  return redisClient.keys( pattern);
}


export {
  set,
  get
}
