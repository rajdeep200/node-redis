import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 4040
app.listen(PORT, () => {
    console.log('App is running on PORT ', PORT)
})