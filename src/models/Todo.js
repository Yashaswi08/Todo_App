import mongoose from 'mongoose'

const TodosSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
},

  {
    timestamps:
      { createdAt: 'created_at' }
  })

mongoose.model('Todos', TodosSchema)
