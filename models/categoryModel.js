const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Musisz podać nazwę kategorii"],
        trim: true,
        maxlength: [32, "Nazwa kategorii może mieć maksymalnie 32 znaki"],
        unique: [true, "Taka kategoria już istnieje"]
    }
}, { timestamps: true })

const Category = mongoose.model('category', categorySchema)

module.exports = Category