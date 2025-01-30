import mongoose, { mongo } from "mongoose";

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    salePrice: {
        type: Number,
        default: null, // Sale price is optional
    },
    sizes: {
        type: Array,
        required: true
    },
    bestSeller: {
        type: Boolean,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
})

const productModel = mongoose.models.Product || mongoose.model("Product", productShema);
export default productModel;