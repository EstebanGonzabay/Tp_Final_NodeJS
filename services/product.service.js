import product_repository from "../repositories/product.repository.js";

class ProductService {
    async getAllProducts() {
        try {
            return await product_repository.findAll();
        } catch (error) {
            throw new Error(`Error getting products: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            const product = await product_repository.findById(id);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            if (!product.isActive) {
                throw new Error('Producto no disponible');
            }
            return product;
        } catch (error) {
            throw new Error(`Error getting product: ${error.message}`);
        }
    }

    async createProduct(productData) {
        try {
            return await product_repository.create(productData);
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async updateProduct(id, productData) {
        try {
            const product = await product_repository.update(id, productData);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await product_repository.delete(id);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product;
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

const product_service = new ProductService();

export default product_service;