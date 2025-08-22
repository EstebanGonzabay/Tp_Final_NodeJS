import express from 'express'
import task_controller from '../controllers/task.controller.js'

const task_router = express.Router()

task_router.get(
    '/',
    task_controller.getTasks
)

task_router.get(
    '/instructions', 
    task_controller.getInstructionsForTask
)

task_router.post(
    '/',
    task_controller.postTask
)

task_router.get(
    '/:task_id',
    task_controller.getTaskById
)

task_router.put(
    '/:task_id',
    task_controller.putTask
)

task_router.delete(
    '/:task_id',
    task_controller.deleteTask
)




export default task_router