/* 
Una clase nos permite crear objetos 
Esta clase en particular es un Singleton para manejar productos
*/

import product_service from "../services/product.service.js"

class ProductController {
    // GET /api/products - Listar todos los productos
    async getProducts(request, response) {
        try {
            const products = await product_service.getAllProducts()
            
            return response.json({
                success: true,
                message: 'Productos obtenidos exitosamente',
                data: {
                    products: products,
                    count: products.length
                }
            })
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    // GET /api/products/:product_id - Obtener producto por ID
    async getProductById(request, response) {
        try {
            const product = await product_service.getProductById(request.params.product_id)
            
            return response.json({
                success: true,
                message: 'Producto obtenido exitosamente',
                data: {
                    product: product
                }
            })
        } catch (error) {
            if (error.message.includes('no encontrado') || error.message.includes('no disponible')) {
                return response.status(404).json({
                    success: false,
                    message: error.message
                })
            }
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    // POST /api/products - Crear nuevo producto
    async postProduct(request, response) {
        try {
            const product = await product_service.createProduct(request.body)
            
            return response.status(201).json({
                success: true,
                message: 'Producto creado exitosamente',
                data: {
                    product: product
                }
            })
        } catch (error) {
            return response.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    // PUT /api/products/:product_id - Actualizar producto
    async putProduct(request, response) {
        try {
            const product = await product_service.updateProduct(
                request.params.product_id, 
                request.body
            )
            
            return response.json({
                success: true,
                message: 'Producto actualizado exitosamente',
                data: {
                    product: product
                }
            })
        } catch (error) {
            if (error.message.includes('no encontrado')) {
                return response.status(404).json({
                    success: false,
                    message: error.message
                })
            }
            return response.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    // DELETE /api/products/:product_id - Eliminar producto
    async deleteProduct(request, response) {
        try {
            const product = await product_service.deleteProduct(request.params.product_id)
            
            return response.json({
                success: true,
                message: 'Producto eliminado exitosamente',
                data: {
                    product: product
                }
            })
        } catch (error) {
            if (error.message.includes('no encontrado')) {
                return response.status(404).json({
                    success: false,
                    message: error.message
                })
            }
            return response.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    // GET /api/products/instructions - Instrucciones para usar la API
    getInstructionsForProducts(request, response) {
        const instructions = {
            title: 'Cómo usar la API de Productos',
            body: `
                <h2>Endpoints disponibles:</h2>
                <ul>
                    <li><strong>GET /api/products</strong> - Listar todos los productos</li>
                    <li><strong>GET /api/products/:id</strong> - Obtener producto por ID</li>
                    <li><strong>POST /api/products</strong> - Crear nuevo producto</li>
                    <li><strong>PUT /api/products/:id</strong> - Actualizar producto</li>
                    <li><strong>DELETE /api/products/:id</strong> - Eliminar producto</li>
                </ul>
                <h3>Ejemplo de creación:</h3>
                <pre>
{
  "name": "Nombre del producto",
  "description": "Descripción del producto",
  "price": 100.99,
  "category": "Electrónicos",
  "stock": 10
}
                </pre>
            `
        }
        return response.json(instructions)
    }
}

const product_controller = new ProductController()

export default product_controller