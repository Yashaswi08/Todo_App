import express from 'express'
import Todos from './Todos'
const router = express.Router()

router.use('/todos', Todos)

export default router