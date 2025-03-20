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
const redisService_1 = __importDefault(require("../services/redisService"));
class RedisController {
    static storeData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { key, value } = req.body;
                const response = yield redisService_1.default.set(key, value);
                if (response.success) {
                    res.status(200).json({
                        message: response.message
                    });
                }
                else {
                    res.status(500).json({
                        message: response.message,
                        error: response.error
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "[ERROR][StoreData] Something went wrong",
                    error: error
                });
            }
        });
    }
    static getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { key } = req.body;
                const response = yield redisService_1.default.get(key);
                if (response.success) {
                    res.status(200).json({
                        data: response.message,
                    });
                }
                else {
                    res.status(500).json({
                        data: response,
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "[ERROR][GetData] Something went wrong",
                    error: error
                });
            }
        });
    }
    static deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { key } = req.body;
                const response = yield redisService_1.default.delete(key);
                if (response === null || response === void 0 ? void 0 : response.success) {
                    res.status(200).json({
                        message: response.message,
                    });
                }
                else {
                    res.status(500).json({
                        message: response.message,
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "[ERROR][DELETE] Something went wrong",
                    error: error
                });
            }
        });
    }
}
exports.default = RedisController;
