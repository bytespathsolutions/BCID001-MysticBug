import mongoose from "mongoose"
export const taskSchema = new mongoose.Schema({
  uid: {
    type: String
  },
  task: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['Incomplete', 'Urgent', 'Complete'],
    required: true
  }
})
export const Task = mongoose.model("Task", taskSchema)