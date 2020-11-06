const express = require('express')
const router = express.Router()
const { userById, getProfile, updateProfile } = require('../controllers/userControllers')
const { protectedRoute, adminRoute, exactIdRoute } = require('../controllers/authMiddleware')

router.get('/get/:userId', exactIdRoute, adminRoute, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.route('/profile/:userId').get(exactIdRoute, getProfile)
router.route('/profile/:userId').put(exactIdRoute, updateProfile)


router.param('userId', userById)

module.exports = router