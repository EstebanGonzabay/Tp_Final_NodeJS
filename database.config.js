/* Conexion con MongoDB */

import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

async function connectToMongoDB() {
    try{
        await mongoose.connect(MONGO_URI)
        console.log('Conexion con MongoDB establecida')
    }
    catch(error){
        console.error('Error al conectarse con MongoDB', error)
    }
}

export default connectToMongoDB