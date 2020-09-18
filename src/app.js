import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import './models'
import router from './routes'


dotenv.config()
const app = express()

if (process.env.NODE_ENV !== 'production') {
  import morgan from 'morgan'
  app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// db config
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.DB_URI, () => {
  console.log('Connected to MongoDB')
})

app.use(express.static('public'))

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './../../public/index.html'))
})
app.use('/api/v1', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})
