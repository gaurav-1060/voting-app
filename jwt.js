


const jwt = require('jsonwebtoken');
const secret_key='12345';

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        const decoded = jwt.verify(token, secret_key);

        req.user = decoded
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}


const generateToken = (userData) => {
    return jwt.sign(userData, secret_key, {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware, generateToken};