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
function ping(str?: string): Promise<string> {
  return super.sendCommand('ping', str ? [str] : [])
}

/**
 * Returns value or null when the key is missing - See [redis get]{@link https://redis.io/commands/get}
 * @async
 * @param key - key for the value stored
 * @returns value or null when the key is missing
 */
const get2 = async (key: string):Promise<any> => {
  let result = await redisClient.set('get', [key])

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
function set2(key: string, value: any, ttlInSeconds?: number): Promise<any> {
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
    Array.isArray(value) || isJSON(value, true)
      ? JSON.stringify(value)
      : value
  const ttl = validatedTtl(ttlInSeconds, this.defaultTtlInS)

  let result = await super.sendCommand('getset', [key, str])
  try {
    result = JSON.parse(result)
  } catch (e) {
    // do nothing
  }

  if (ttl) {
    await super.sendCommand('expire', [key, ttl])
  }
  return result
}

/**
 * Returns the number of keys that were removed - See [redis del]{@link https://redis.io/commands/del}
 *
 * @param keys - list of keys to delete
 * @returns The number of keys that were removed.
 */
function del(keys: string[] = []): Promise<number> {
  return super.sendCommand('del', keys)
}

/**
 * Returns 1 if the timeout was set/ 0 if key does not exist or the timeout could not be set - See [redis expire]{@link https://redis.io/commands/expire}
 *
 * @param   {string}  key          - key to set expire
 * @param   {number}  ttlInSeconds - time to live in seconds
 * @returns 1 if the timeout was set successfully; if not 0
 */
function expire(key: string, ttlInSeconds: number): Promise<number> {
  const ttl = validatedTtl(ttlInSeconds)
  return super.sendCommand('expire', [key, ttl])
}

/**
 * Returns TTL in seconds, or a negative value in order to signal an error - See [redis ttl]{@link https://redis.io/commands/ttl}
 *
 * @param key - list of keys to delete
 * @returns TTL in seconds, or a negative value in order to signal an error
 */
function getTtl(key: string): Promise<number> {
  return super.sendCommand('ttl', [key])
}

/**
 * Returns all keys matching pattern - See [redis keys]{@link https://redis.io/commands/keys}
 *
 * @param pattern - glob-style patterns/default '*'
 * @returns all keys matching pattern
 */
function keys(pattern = '*'): Promise<string[]> {
  return super.sendCommand('keys', [pattern])
}

/**
 * Deletes all keys matching pattern
 *
 * @param pattern - glob-style patterns/default '*'
 * @returns The number of keys that were removed.
 */
function deleteAll(pattern = '*'): Promise<number> {
  debug('clearing redis keys: ', pattern)
return this._executeDeleteAll(pattern)
}


export {
  set,
  get
}
