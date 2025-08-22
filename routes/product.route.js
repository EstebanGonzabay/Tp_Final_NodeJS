import express from 'express'


/* Manejando la ruta de productos, osea que la consultas relacionadas con los productos se manejaran aqui */

//Se crea un enrutador
const product_router = express.Router()

product_router.get(
    '/',
    ( request, response ) => {
        response.send('Hola, todo esta funcionando')
    }
)

product_router.get(
    '/:product_id', 
    (request, response) => {

    }
)

product_router.post(
    '/',
    (request, response) => {

    }
)

product_router.put(
    '/',
    (request, response) => {

    }
)

product_router.delete(
    '/', 
    (request, response) => {
        
    }
)

export default product_router