import app from './app'

const PORT = process.env.PORT || 4040
app.listen(PORT, () => {
    console.log('App is running on PORT ', PORT)
})