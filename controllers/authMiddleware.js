const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.protectedRoute = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if(err) res.status(403).json({ response: "Musisz być zalogowany" })
            else next()
        })
    } else {
        res.status(403).json({ response: "Musisz być zalogowany" })
    }
}

exports.adminRoute = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) res.status(403).json({ response: "Musisz być zalogowany" })
            else {
                const user = await User.findById(decodedToken.id)
                if(user.role === 0) {
                    res.status(403).json({ response: "Musisz być administratorem" })
                } else {
                    next()
                }
            }
        })
    } else {
        res.status(403).json({ response: "Musisz być administratorem" })
    }
}

exports.exactIdRoute = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if(err) res.status(403).end()
            else {
                if(req.profile._id == decodedToken.id){
                    next()
                } else {
                    res.status(403).end()
                }
            }
        })
    } else {
        res.status(403).end()
    }
}