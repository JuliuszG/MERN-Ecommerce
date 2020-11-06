const jwt = require('jsonwebtoken')

exports.createToken = (id, date) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: date
    })
}