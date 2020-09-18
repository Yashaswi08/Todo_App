import express from 'express'
import TodosController from './../controllers/Todo'
const router = express.Router()

router.get('/', TodosController.getAll)
router.get('/:id', TodosController.get)
router.post('/', TodosController.add)
router.patch('/:id', TodosController.update)
router.delete('/:id', TodosController.del)


export default router