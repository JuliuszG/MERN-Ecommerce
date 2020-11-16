const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const expressJwt = require('express-jwt')

exports.protectedRoute = expressJwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    userProperty: "authUser"
})

exports.adminRoute = (req, res, next) => {
   if(req.profile.role === 0) {
       return res.status(403).json({ response: "Brak dostępu"})
   }
   next()
}

exports.exactIdRoute = (req, res, next) => {
   let user = req.profile && req.authUser && req.profile._id == req.authUser.id
   if(!user){
      return res.status(403).json({ response: "Brak dostępu"})
   }
   next()
}