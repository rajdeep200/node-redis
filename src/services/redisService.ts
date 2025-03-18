import redisClient from "../config/redisClient";

class RedisService {
  static async set<T>(key: string, value: T, expiry = 3600) {
    try {
      await redisClient.set(key, JSON.stringify(value), { EX: expiry });
    } catch (e) {
      console.error("[ERROR] :: Unable to Set Data");
    }
  }
}

export default RedisService
