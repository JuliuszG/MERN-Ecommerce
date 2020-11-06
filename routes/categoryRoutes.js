const express = require('express')
const router = express.Router()
const { create, deleteCategory, updateCategory, findCategoryById, getCategoryById, getAll } = require('../controllers/categoryControllers')
const { adminRoute } = require('../controllers/authMiddleware')

router.route('/create').post(adminRoute, create)
router.route('/delete/:categoryId').delete(adminRoute, deleteCategory)
router.route('/update/:categoryId').put(adminRoute, updateCategory)
router.route('/get/:categoryId').get(getCategoryById)
router.route('/all').get(getAll)

router.param("categoryId", findCategoryById)
module.exports = router