
import mongoose from "mongoose";

/** El schema nos permite definir como sera cada task */
const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        completed:{
            type: Boolean,
            default: false
        }
    }
)

/** Con Task despues podre hacer consultas a la coleccion de tareas */

const Task = mongoose.model('task', TaskSchema)

export default Task