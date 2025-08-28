import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './database.config.js';
import product_router from './routes/product.route.js';

/* Guarda las variables de entorno en process.env */
dotenv.config();

// Crear una aplicacion de express
const app = express();

/* Middleware */
app.use(cors()); // Habilita CORS
app.use(express.json()); // Habilita que nuestro servidor pueda recibir JSON

// // Conexión a MongoDB

connectToMongoDB();

/* 
Todas las consultas que lleguen a '/api/products' serán manejadas por product_router
*/
app.use('/api/products', product_router);

// Ruta de salud para verificar que el servidor funciona
app.get('/health', (request, response) => {
    response.json({
        message: "Servidor funcionando correctamente",
        status: "OK",
        timestamp: new Date().toISOString()
    });
});

// Ruta principal con documentación de la API
app.get('/', (request, response) => {
    response.json({
        message: 'Bienvenido a la API de Productos',
        version: '1.0.0',
        endpoints: {
            'GET /api/products': 'Listar todos los productos',
            'GET /api/products/:product_id': 'Obtener producto específico',
            'POST /api/products': 'Crear nuevo producto',
            'PUT /api/products/:product_id': 'Actualizar producto',
            'DELETE /api/products/:product_id': 'Eliminar producto',
            'GET /health': 'Estado del servidor'
        }
    });
});

// Manejo de rutas no encontradas
app.use('*', (request, response) => {
    response.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Dedicamos un puerto de ejecucion a nuestra aplicacion
app.listen(8080, () => {
    console.log('Servidor escuchandose en el puerto ' + 8080)
})