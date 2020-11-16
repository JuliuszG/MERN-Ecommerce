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
const { protectedRoute, adminRoute, exactIdRoute } = require('../controllers/authMiddleware')
const { userById } = require('../controllers/userControllers')

router.route('/create/:userId').post(protectedRoute, exactIdRoute, adminRoute, create)
router.route('/get/:productId').get(getProduct)
router.route('/delete/:productId/:userId').delete(protectedRoute, exactIdRoute, adminRoute, deleteProduct)
router.route('/update/:productId/:userId').put(protectedRoute, exactIdRoute, adminRoute, updateProduct)
router.route('/search').get(productQuery)
router.route('/related/:productId').get(getRelated)
router.route('/categories').get(getProductCategories)
router.route('/by/search').post(getProductsBySearch)
router.route('/photo/:productId').get(getPhoto)

router.param("productId", productById)
router.param("userId", userById)

module.exports = router