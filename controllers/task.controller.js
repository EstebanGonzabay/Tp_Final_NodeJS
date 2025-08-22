
/* 
Una clase nos permite crear objetos 
Esta clase en particular es un Singleton
*/

import task_service from "../services/task.service.js"

class TaskController {
    async getTasks(request, response){
        const tasks = await task_service.getTasks()

        return response.json({
            message: 'Tareas obtenidas exitosamente',
            data: {
                tasks: tasks
            }
        })
    }

    getTaskById(request, response){
        
    }
    postTask(request, response){

    }
    putTask(request, response){

    }
    deleteTask(request, response){

    }

    getInstructionsForTask(request, response){
        const instructions = {
            title: 'Como crear una tarea?',
            body: `
                <p>Para crear una tarea recomendamos pensar en un titulo y luego dar click al boton de crear tarea</p>
            `
        }
        return response.json(instructions)
    }
}


const task_controller = new TaskController()

export default task_controller