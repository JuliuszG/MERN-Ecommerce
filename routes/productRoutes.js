const express = require('express')
const router = express.Router()
const { 
        create, 
        productById, 
        getProduct, 
        deleteProduct, 
        updateProduct,
        productQuery,
        getRelated,
        getProductCategories,
        getProductsBySearch,
        getPhoto
    } = require('../controllers/productControllers')
const { adminRoute } = require('../controllers/authMiddleware')

router.route('/create').post(adminRoute, create)
router.route('/get/:productId').get(getProduct)
router.route('/delete/:productId').delete(adminRoute, deleteProduct)
router.route('/update/:productId').put(adminRoute, updateProduct)
router.route('/search').get(productQuery)
router.route('/related/:productId').get(getRelated)
router.route('/categories').get(getProductCategories)
router.route('/by/search').post(getProductsBySearch)
router.route('/photo/:productId').get(getPhoto)

router.param("productId", productById)

module.exports = router