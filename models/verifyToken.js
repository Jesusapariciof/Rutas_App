require('dotenv').config()
const jwt= require('jsonwebtoken')
const { env: { SECRET } } = process

function verifyToken(req, res, next){

    // const { headers: { authorization } } = req
    // console.log(req.headers)
    // Bearer <Token>
    // const token = authorization.replace('Bearer ', '')
    
    const token = req.headers["authorization"]
   
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    jwt.verify(token.split(" ")[1], SECRET, (err, decode)=>{
        if(err){
            return res.status(403).send("Inicia sesión para realizar cambios")
        }else{
            req.userId= decode.id
            next()
        }
        
    })
    // const decoded= jwt.verify(token, SECRET);
    // req.userId = decoded.id;
    // next();
}

module.exports = verifyToken;

