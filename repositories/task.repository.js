/* Aca manejamos los datos que se guardan */
/* Pro tip: para hacerlo bien, asegurate de que siempre respondas de  misma manera

Ej: tengo mi DB en mongo DB, getTaskById =>  {title: 'trabajar', id: 24}
...Futuro: Ej: tengo otra db en MYSQL, getTaskById => {title: 'trabajar', id: 24}

*/

import Task from "../models/TaskModel.js"

class TaskRepository {
    async getTasks() {
        const tasks = await Task.find()
        return tasks
    }

    async getTaskById(task_id) {
        const task_found = await Task.findById(task_id)
        return task_found
    }

    async createTask(title) {
        const new_task = new Task({ title, completed: false })
        await new_task.save()
    }

    async updateTaskById(task_id, new_task_data) {
        const task = await Task.findByIdAndUpdate(
            task_id,
            new_task_data,
            { new: true }
        )
        return task
    }

    async deleteTaskById(task_id) {
        await Task.findByIdAndDelete(task_id)
    }
}


const task_repository = new TaskRepository()

export default task_repository

/* .populate */