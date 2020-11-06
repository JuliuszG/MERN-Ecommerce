const Product = require('../models/productModel')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const { handleProductErrors } = require('../utility/errorHandlers')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) res.status(400).json({ response: "Błąd podczas wrzucania pliku" })
            let product = new Product(fields)
            if(files.photo){
                if(files.photo.size > 1000000) {
                    return res.status(400).json({ response: "Zdjecie nie może zajmować wiecej niż 1mb" })
                }
                product.photo.data = fs.readFileSync(files.photo.path)
                product.photo.contentType = files.photo.type
            }  
            product.save((err) => {
                if(err){
                    const errs = handleProductErrors(err)
                    res.status(403).json(errs)
                } else {
                    res.status(201).json({ response: "Produkt został dodany" })
                }            
            })                 
    })
}

exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id)
    if(!product) res.status(400).json({ response: "Nie znaleziono takiego produktu" })
    else{
        req.profile = product
        next()
    }
  } catch (error) {
    res.status(400).json({ response: "Nie znaleziono takiego produktu" })
  }
}

exports.getProduct = (req, res) => {
    req.profile.photo = undefined
    res.status(200).json(req.profile)
}

exports.deleteProduct = (req, res) => {
    const product = req.profile
    product.remove(err => {
        if(err) res.status(400).json({ response: "Nie udało się usunąć produktu" })
        res.status(200).json({ response: "Produkt został usunięty" })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) res.status(400).json({ response: "Błąd podczas wrzucania pliku" })
            let product = req.profile
            product = _.extend(product, fields)
            if(files.photo){
                if(files.photo.size > 1000000) {
                    return res.status(400).json({ response: "Zdjecie nie może zajmować wiecej niż 1mb" })
                }
                product.photo.data = fs.readFileSync(files.photo.path)
                product.photo.contentType = files.photo.type
            }  
            product.save((err) => {
                if(err){
                    const errs = handleProductErrors(err)
                    res.status(403).json(errs)
                } else {
                    res.status(201).json({ response: "Produkt został zaktualizowany" })
                }            
            })                 
    })
}

// by sell = /product?sortBy=sold&order=desc&limit=4
// by arrival = /product?sortBy=createdAt&order=desc&limit=4

exports.productQuery = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
        if(err) {
            return res.status(400).json({ response: "Nie znaleziono produktów" })
        } else {
            res.status(200).json(data)
        }
    })
}

exports.getRelated = (req, res) => {
    const originalProduct = req.profile
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Product.find({ _id: { $ne: originalProduct }, category: originalProduct.category })
    .select("-photo")
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
        if(err){
            return res.status(400).json({ response: "Nie znaleziono podobnych produktów" })
        } else {
            res.status(200).json(products)
        }
    })

}

exports.getProductCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if(err){
            return res.status(400).json({ response: "Nie znaleziono kategorii" }) 
        } else {
            res.status(200).json(categories)
        }
    })
}

exports.getProductsBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Nie znaleziono żadnych produktów"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
}

exports.getPhoto = (req, res, next) => {
    const product = req.profile
    if(product.photo.data) {
        res.set('Content-Type', product.photo.contentType)
        return res.send(product.photo.data)
    }
    next()
}