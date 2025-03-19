import express from "express";
import RedisRouter from './routes/redisRoute'

const app = express()
app.use(express.json())

app.use("/api", RedisRouter)

export default app;