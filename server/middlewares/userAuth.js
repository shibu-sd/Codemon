const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path : "../.env"});

function generateUserToken(username) {
    const token = jwt.sign({username, role : "user"}, `${process.env.SECRET_KEY_USER}`, {expiresIn : "1h"});
    return token;
} 

function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; 
        jwt.verify(token, `${process.env.SECRET_KEY_USER}`, (err, user) => {
            if (err) {
                res.status(401).json({message : "Unauthorized token"});
                return;
            }
            
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json({message : "Missing token"});
    }
}

module.exports = {generateUserToken, authenticateUser};