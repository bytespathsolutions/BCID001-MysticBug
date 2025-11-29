import { createTask, deleteTask, getTasks } from "../controllers/task.js";
import express from "express";

export const taskRouter = express.Router();
// create task
taskRouter.post('/tasks/:uid', createTask)
// get task
taskRouter.get('/tasks/:uid', getTasks)
// delete task
taskRouter.delete('/tasks/:uid/:id', deleteTask);