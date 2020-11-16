const express = require('express')
const router = express.Router()
const { create, deleteCategory, updateCategory, findCategoryById, getCategoryById, getAll } = require('../controllers/categoryControllers')
const { protectedRoute, adminRoute, exactIdRoute } = require('../controllers/authMiddleware')
const { userById } = require('../controllers/userControllers')

router.route('/create/:userId').post(protectedRoute, exactIdRoute, adminRoute, create)
router.route('/delete/:categoryId/:userId').delete(protectedRoute, exactIdRoute, adminRoute, deleteCategory)
router.route('/update/:categoryId/:userId').put(protectedRoute, exactIdRoute, adminRoute, updateCategory)
router.route('/get/:categoryId').get(getCategoryById)
router.route('/all').get(getAll)

router.param("categoryId", findCategoryById)
router.param("userId", userById)

module.exports = router