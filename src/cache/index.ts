import Redis from 'ioredis';

class Cache {
  private redis: Redis.Redis;
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6378,
      keyPrefix: 'caching'
    });
  }

  async getData(key: string) {
    const value = await this.redis.get(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }

  setData(key: string, value: any, timeExpiration: number) {
    return this.redis.set(key, JSON.stringify(value), 'EX', String(timeExpiration));
  }

  deleteData(key: string) {
    return this.redis.del(key);
  }
}

export default new Cache();