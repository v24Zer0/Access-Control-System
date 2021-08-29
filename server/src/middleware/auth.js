const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if(authHeader) {
        const bearer = authHeader.split(' ');
        if(bearer.length === 2) {
            try {
                jwt.verify(bearer[1], process.env.TOKEN_SECRET);
                return next();
            } catch(error) {
                res.status(403).send();
            }
        } 
    }
    res.status(403).send();
    return;
}

function generateToken(username) {
    return jwt.sign({username: username}, process.env.TOKEN_SECRET.toString(), {
        expiresIn: '24h'
    });
}

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch(error) {
        return '';
    }
}

async function validatePassword(password, hash) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch(error) {
        return false;
    }
}
 
module.exports = {
    verifyToken,
    generateToken,
    validatePassword,
    hashPassword
};