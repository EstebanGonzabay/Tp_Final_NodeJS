/* Se encarga de manejar la logica de negocio */

import task_repository from "../repositories/task.repository.js";

class TaskService {
    getTasks(){
        return task_repository.getTasks()
    }
    getTaskById(){
        
    }
    createTask(){

    }
}

const task_service = new TaskService()
export default task_service

/* 
Ejemplo de un posible servicio real:
class RekognitionService {
    async validadIdentidad (){
        const CONFIG_MIN_SCORE = 950
        const liveness_response = await awsRekognition.get(1)
        if(liveness_response.score > CONFIG_MIN_SCORE){
            userRepository.update({validated: true})
            mailService.send(user.email, `Su indentida ha sido validada`)
        }
        else{
            userRepository.update({validated: false})
            mailService.send(user.email, `Su indentida no se pudo validar, click aqui para reintentar`)
        }
    }
}
*/