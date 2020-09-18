import mongoose from 'mongoose'
const Todos = mongoose.model('Todos')

// Get all Todos list

const getAll = async (req, res) => {
  const todos = await Todos.find({})
  res.send(todos)
}

// Get a specific Todo

const get = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .send({})
  }

  try {
    const id = req.params.id
    const todo = await Todos.findById(id)

    if (!todo) {
      res
        .status(404)
        .send('')
    }

    res
      .status(200)
      .send(todo)
  } catch (err) {
    res
      .status(500)
      .send({
        message: 'Something went wrong.'
      })
  }
}

// Add a Todo task
const add = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send()
  }

  try {
    const result = new Todos(req.body)
    const todo = await result.save()
    return res
      .status(201)
      .send(todo)
  } catch (err) {
    res
      .status(500)
      .send({
        message: 'Something went wrong'
      })
  }
}

// Update existing task
const update = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .send({})
  }

  try {
    const id = req.params.id
    let todo = await Todos.findById(id)

    if (!todo) {
      return res
        .status(400)
        .send({})
    }

    Object.keys(req.body).map(key => {
      todo[key] = req.body[key]
    })

    todo.save()
    res
      .status(201)
      .send(todo)
  } catch (err) {
    res
      .status(500)
      .send({
        message: 'Something went wrong.'
      })
  }
}

// Delete a task

const del = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .send({})
  }

  try {
    const id = req.params.id
    const todo = await Todos.findByIdAndDelete(id)
    if (todo) {
      res
        .status(200)
        .send({
          message: 'Todo deleted successfully'
        })
    }
  } catch (err) {
    res
      .status(500)
      .send({
        message: 'Something went wrong.'
      })
  }
}

export default ({
  getAll,
  get,
  add,
  update,
  del
})
