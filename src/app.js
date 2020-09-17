import path from 'path'
import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes'


dotenv.config()
const app = express()


//db config
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.DB_URI)

app.use(express.static('public'))
app.use('/', router)

const PORT = process.env.PORT||3000
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})