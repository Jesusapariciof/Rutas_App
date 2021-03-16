require('dotenv').config()
const jwt= require('jsonwebtoken')
const { env: { SECRET } } = process

function verifyToken(req, res, next){

    const { headers: { authorization } } = req

    // Bearer <Token>
    const token = authorization.replace('Bearer ', '')

    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded= jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;

