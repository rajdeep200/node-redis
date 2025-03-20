"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redisController_1 = __importDefault(require("../controllers/redisController"));
const router = (0, express_1.Router)();
router.get('/get', redisController_1.default.getData);
router.post('/store', redisController_1.default.storeData);
router.post('/delete', redisController_1.default.deleteData);
exports.default = router;
