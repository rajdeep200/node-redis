import { Request, Response } from "express";
import RedisService from '../services/redisService'

class RedisController {

    static async storeData(req:Request, res:Response){
        try {
            const {key, value} = req.body
            const response = await RedisService.set(key, value)
            if(response.success){
                res.status(200).json({
                    message: response.message
                })
            }else {
                res.status(500).json({
                    message: response.message,
                    error: response.error
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "[ERROR][StoreData] Something went wrong",
                error: error
            })
        }
    }

    static async getData(req:Request, res:Response) {
        try {
            const {key} = req.body
            const response = await RedisService.get(key)
            if(response.success){
                res.status(200).json({
                    data: response.message,
                })
            }else {
                res.status(500).json({
                    data: response,
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "[ERROR][GetData] Something went wrong",
                error: error
            })
        }
    }

    static async deleteData(req:Request, res:Response){
        try {
            const {key} = req.body
            const response = await RedisService.delete(key)
            if(response?.success){
                res.status(200).json({
                    message: response.message,
                })
            }else {
                res.status(500).json({
                    message: response.message,
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "[ERROR][DELETE] Something went wrong",
                error: error
            })
        }
    }

}

export default RedisController