const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Musisz podać nazwę produktu"],
        maxlength: [32, "Nazwa nie może zawierać więcej niż 32 znaki"],
        unique: [true, "Taki produkt już istnieje"]
    },
    description: {
        type: String,
        required: [true, "Musisz podać opis produktu"],
        maxlength: [2000, "Opis nie może zawierać więcej niż 2000 znaków"]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Musisz podac cenę produktu"],
        maxlength: [32, "Cena nie może zawierać więcej niż 32 znaki"]
    },
    category: {
        type: ObjectId,
        ref: "category",
        required: [true, "Produkt musi należeć do istniejącej kategorii"]
    },
    quantity: {
        type: Number,     
    },
    sold: {
        type: Number,     
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

const Product = mongoose.model('product', productSchema)

module.exports = Product