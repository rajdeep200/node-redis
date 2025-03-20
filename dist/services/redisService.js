"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisClient_1 = __importDefault(require("../config/redisClient"));
class RedisService {
    static getInstance() {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }
    static set(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, expiry = 3600) {
            try {
                yield redisClient_1.default.set(key, JSON.stringify(value), { EX: expiry });
                console.log(`[SUCCESS] Data ${key} set successfully.`);
                return {
                    success: true,
                    message: `Data ${key} set successfully.`
                };
            }
            catch (e) {
                console.error("[ERROR] :: Unable to Set Data", e);
                return {
                    success: false,
                    error: e
                };
            }
        });
    }
    static get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield redisClient_1.default.get(key);
                return data ? {
                    success: true,
                    message: `[SUCCESS] Data retrieved successfully.`,
                    data: JSON.parse(data)
                } : {
                    success: false,
                    message: `[ERROR] Data retrieval failed.`,
                    data
                };
            }
            catch (error) {
                console.error("[ERROR] :: Unable to Get Data", error);
                return {
                    success: false,
                    message: "[ERROR] :: Unable to Get Data",
                    error
                };
            }
        });
    }
    static delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield redisClient_1.default.del(key);
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
            }
            catch (error) {
                console.error("[ERROR] :: Unable to Delete Data", error);
                return {
                    success: false,
                    message: `[ERROR] Unable to Delete data with key ${key}`,
                    error
                };
            }
        });
    }
}
exports.default = RedisService;
