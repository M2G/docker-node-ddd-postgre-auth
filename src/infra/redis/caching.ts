/*eslint-disable*/
import redis, { ClientOpts as RedisOptions } from 'redis'
import validatedTtl from './validatedTtl';

const HOST = process.env.NODE_ENV === 'development' ? 'redis' : 'localhost';

const portRedis = process.env.HOST_PORT_REDIS || 6379;

const createClient = (redisOptions: RedisOptions) => {
    console.log('Start redis createClient', redisOptions);
    const client = redis.createClient(redisOptions);

    client.on('error', err => {
      console.log('Failed redis createClient', err);
    });
    client.on('connect', () => {
      console.log('Succeeded redis createClient', redisOptions);
  });

    return client;
}

const redisOptions: RedisOptions = {
  port: Number(portRedis),
  host: HOST,
}

const redisClient = createClient(redisOptions) as any;

const TTL = 5 * 60;

let defaultTtlInS = validatedTtl(TTL);

export default ({ config }: any) => ({
  /**
   * Returns 'OK' if successful
   *
   * @param key - key for the value stored
   * @param value - value to stored
   * @param ttlInSeconds - time to live in seconds
   * @returns 'OK' if successful
   */

  set: (key: string, value: any, ttlInSeconds?: number): boolean => {
    const str = Array.isArray(value) ? JSON.stringify(value) : value;

    const ttl = validatedTtl(ttlInSeconds, defaultTtlInS);

    if (ttl) return redisClient.setex(key, ttl, str);

    return redisClient.set(key, str);
  },

  /**
   * Returns value or null when the key is missing - See [redis get]{@link https://redis.io/commands/get}
   * @async
   * @param key - key for the value stored
   * @returns value or null when the key is missing
   */

  get: (key: string): Promise<Error | string | null> => {
    return new Promise((resolve, reject) => {
      return redisClient.get(
        key,
        (err: Error | null, res: string | null) => {
          if (err) return reject(err);

          return resolve(res ? JSON.parse(<string>res) : null);
        },
      );
    })
  },
  /**
   * Returns 'OK' if successful
   * @async
   * @param key          - key for the value stored
   * @param value        - value to stored
   * @param ttlInSeconds - time to live in seconds
   * @returns
   */
  getset: async (
    key: string,
    value: any,
    ttlInSeconds: number | undefined,
  ): Promise<any> => {
    const str = Array.isArray(value) ? JSON.stringify(value) : value;

    const ttl = validatedTtl(ttlInSeconds, defaultTtlInS);

    let result = (redisClient.getset(key, str)) as any;

    try {
      result = JSON.parse(result);
    } catch (e: any) {
      // do nothing
      throw new Error(e);
    }

    if (ttl) {
      redisClient.expire(key, ttl);
    }
    return result;
  },

  /**
   * Returns 'PONG'
   *
   * @param str - string passed
   * @returns 'PONG'/string passed
   */

  ping: (str?: string | any): boolean =>
    redisClient.ping(str ? str : []),

  /**
   * Returns 1 if the timeout was set/ 0 if key does not exist or the timeout could not be set - See [redis expire]{@link https://redis.io/commands/expire}
   *
   * @param   {string}  key          - key to set expire
   * @param   {number}  ttlInSeconds - time to live in seconds
   * @returns 1 if the timeout was set successfully; if not 0
   */

  expire: (key: string, ttlInSeconds: number): boolean => {
    const ttl = validatedTtl(ttlInSeconds);
    return redisClient.expire(key, <number>ttl);
  },

  /**
   * Returns all keys matching pattern - See [redis keys]{@link https://redis.io/commands/keys}
   *
   * @param pattern - glob-style patterns/default '*'
   * @returns all keys matching pattern
   */
  keys: (pattern = '*'): boolean => {
    return redisClient.keys(pattern);
  },

  /**
   * Unsets the defaultTtlInS
   * @returns true
   */
  unsetDefaultTtlInS: (): boolean => {
    defaultTtlInS = undefined;
    return true;
  },

  /**
   * Return the defaultTtlInS
   * @returns defaultTtlInS
   */
  getDefaultTtlInS: (): number | undefined => {
    return defaultTtlInS;
  },

  /**
   * Sets the defaultTtlInS
   * @param ttl
   * @returns defaultTtlInS
   */

  setDefaultTtlInS: (ttl: number): number | undefined => {
    defaultTtlInS = validatedTtl(ttl)
    return defaultTtlInS
  },

});
