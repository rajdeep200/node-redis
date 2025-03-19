import redisClient from "../config/redisClient";

class RedisService {

  private static instance:RedisService;

  static getInstance():RedisService{
    if(!RedisService.instance){
      RedisService.instance =  new RedisService()
    }

    return RedisService.instance;
  }

  static async set<T>(key: string, value: T, expiry = 3600) {
    try {
      await redisClient.set(key, JSON.stringify(value), { EX: expiry });
      console.log(`[SUCCESS] Data ${key} set successfully.`);
      return {
        success: true,
        message: `Data ${key} set successfully.`
      }
    } catch (e) {
      console.error("[ERROR] :: Unable to Set Data", e);
      return {
        success: false,
        error: e
      }
    }
  }

  static async get<T>(key: string) {
    try {
      const data = await redisClient.get(key);
      return data ? {
        success: true,
        message: `[SUCCESS] Data retrieved successfully.`,
        data: JSON.parse(data)
      } : {
        success: false,
        message: `[ERROR] Data retrieval failed.`,
        data
      };
    } catch (error) {
      console.error("[ERROR] :: Unable to Get Data", error);
      return {
        success: false,
        message: "[ERROR] :: Unable to Get Data",
        error
      };
    }
  }

  static async delete(key:string){
    try {
      const response = await redisClient.del(key);
      console.log('[DELETE] response :: ', response);
  
      if (response === 1) {
        return {
          success: true,
          message: `[SUCCESS] Data ${key} deleted successfully.`
        };
      }
  
      return {
        success: false,
        message: `[INFO] Key ${key} does not exist in Redis.`
      };
    } catch (error) {
      console.error("[ERROR] :: Unable to Delete Data", error);
      return {
        success: false,
        message: `[ERROR] Unable to Delete data with key ${key}`,
        error
      };
    }
  }

}

export default RedisService;
