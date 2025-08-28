import Product from "../models/ProductModel.js";

class ProductRepository {
    async findAll() {
        return await Product.find({ isActive: true });
    }

    async findById(id) {
        return await Product.findById(id);
    }

    async create(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async update(id, productData) {
        return await Product.findByIdAndUpdate(
            id,
            productData,
            { new: true, runValidators: true }
        );
    }

    async delete(id) {
        return await Product.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    }

    async hardDelete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

const product_repository = new ProductRepository()

export default product_repository