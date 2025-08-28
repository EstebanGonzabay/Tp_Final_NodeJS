import express from 'express';
import product_controller from '../controllers/product.controller.js';

/* Manejando la ruta de productos, osea que las consultas relacionadas con los productos se manejaran aqui */

// Se crea un enrutador
const product_router = express.Router();

// GET /api/products - Listar todos los productos
product_router.get(
    '/',
    product_controller.getProducts
);

// GET /api/products/instructions - Instrucciones de uso
product_router.get(
    '/instructions',
    product_controller.getInstructionsForProducts
);

// GET /api/products/:product_id - Obtener un producto específico por ID
product_router.get(
    '/:product_id', 
    product_controller.getProductById
);

// POST /api/products - Crear un nuevo producto
product_router.post(
    '/',
    product_controller.postProduct
);

// PUT /api/products/:product_id - Actualizar un producto existente
product_router.put(
    '/:product_id',
    product_controller.putProduct
);

// DELETE /api/products/:product_id - Eliminar un producto
product_router.delete(
    '/:product_id', 
    product_controller.deleteProduct
);

export default product_router;