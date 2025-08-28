import mongoose from "mongoose";

/** Schema para definir la estructura de los productos */
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del producto es requerido'],
            trim: true,
            maxlength: [100, 'El nombre no puede exceder 100 caracteres']
        },
        description: {
            type: String,
            required: [true, 'La descripción es requerida'],
            maxlength: [500, 'La descripción no puede exceder 500 caracteres']
        },
        price: {
            type: Number,
            required: [true, 'El precio es requerido'],
            min: [0, 'El precio no puede ser negativo']
        },
        category: {
            type: String,
            required: [true, 'La categoría es requerida'],
            enum: ['Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Otros']
        },
        stock: {
            type: Number,
            required: [true, 'El stock es requerido'],
            min: [0, 'El stock no puede ser negativo'],
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true // Agrega createdAt y updatedAt automáticamente
    }
);

/** Modelo para interactuar con la colección de productos */
const Product = mongoose.model('Product', ProductSchema);

export default Product;