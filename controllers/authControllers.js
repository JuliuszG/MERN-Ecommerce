const User = require('../models/userModel')
const { handleErrors } = require('../utility/errorHandlers')
const { createToken } = require('../utility/createToken')
const tokenExpirationDate = 3 * 24 * 60 * 60 * 1000

exports.register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        const token = createToken(user._id, tokenExpirationDate)
        res.cookie('jwt', token, { httpOnly: true, maxAge: tokenExpirationDate,  sameSite: false })
        res.status(201).json({ 
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
         })
    } catch (err) {
        const errs = handleErrors(err)
        res.status(403).json(errs)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id, tokenExpirationDate)
        res.cookie('jwt', token, { httpOnly: true, maxAge: tokenExpirationDate,  sameSite: false })
        res.status(201).json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (err) {
        const errs = handleErrors(err)
        res.status(403).json(errs)
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).end()
}