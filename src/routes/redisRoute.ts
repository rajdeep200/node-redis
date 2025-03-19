import {Router} from "express"
import RedisController from '../controllers/redisController'

const router = Router()

router.get('/get', RedisController.getData)
router.post('/store', RedisController.storeData)
router.post('/delete', RedisController.deleteData)

export default router