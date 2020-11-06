const User = require('../models/userModel')

exports.userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        if(!user) res.status(400).json({ error: "Nie znaleziono użytkownika" })
        req.profile = user
        next()
    } catch (error) {
        res.status(400).json({
            error: "Nie znaleziono użytkownika"
        })
    }
}

exports.getProfile = (req, res) => {
    const user = req.profile
    user.password = undefined
    return res.status(200).json(user)
}

exports.updateProfile = (req, res) => {
    const user = req.profile
    User.findOneAndUpdate({ _id: user._id }, { $set: req.body }, { new: true }, (err, updatedUser) => {
        if(err){
            return res.status(400).json({ response: "Nie udało się zaktualizować profilu" })
        } else {
            updatedUser.password = undefined
            res.status(200).json(updatedUser)
        }
    })
}