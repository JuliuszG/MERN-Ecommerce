const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../controllers/authControllers')
const { protectedRoute } = require('../controllers/authMiddleware')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(protectedRoute, logout)

module.exports = router