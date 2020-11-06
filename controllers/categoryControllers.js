const Category = require('../models/categoryModel')
const { handleCategoryErrors } = require('../utility/errorHandlers')
const _ = require('lodash')

exports.create = async (req, res) => {
    const { name } = req.body
    try {
        const category = await Category.create({name})
        res.status(201).json({
            category
        })
    } catch (err) {
        const errs = handleCategoryErrors(err)
        res.status(403).json(errs)
    }
}

exports.deleteCategory = (req, res) => {
    const category = req.profile
    category.remove(err => {
        if(err) res.status(400).json({ response: "Nie udało się usunąć kategorii" })
        res.status(200).json({ response: "Kategoria została usunięta" })
    })
}

exports.updateCategory = (req, res) => {
    let category = req.profile
    category = _.extend(category, req.body)
    category.save((err) => {
        if(err){
            const errs = handleCategoryErrors(err)
            res.status(403).json(errs)
        } else {
            res.status(201).json({ response: "Kategoria została zaktualizowana" })
        }            
    })    
}

exports.findCategoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id)
        if(!category) res.status(400).json({ response: "Nie znaleziono takiej kategorii" })
        else{
            req.profile = category
            next()
        }    
      } catch (error) {
        res.status(400).json({ response: "Nie znaleziono takiej kategorii" })
      }
}

exports.getCategoryById = (req, res) => {
    res.status(200).json(req.profile)
}

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find()
        if(categories){
            res.status(200).json(categories)
        } else {
            res.status(400).json({ response: "Nie udało się znaleść żadnych kategorii" })
        }
    } catch (error) {
        res.status(400).json({ response: "Nie udało się znaleść żadnych kategorii" })
    }
}