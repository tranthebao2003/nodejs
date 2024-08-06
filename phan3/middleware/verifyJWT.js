const jwt = require('jsonwebtoken')
require('dotenv').config()

// đây là middleware customer
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    // giải thích startWith: https://playcode.io/1961938
    if(!authHeader?.startWith('Bearer ')) return res.sendStatus(401)
    // console.log(authHeader) // Bearer token
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403) //invalid token
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            // next để tiếp tục chương trính
            next()
        }
    )
}

module.exports = {verifyJWT}