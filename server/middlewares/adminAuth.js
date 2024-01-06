const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path : "../.env"});

function generateAdminToken(username) {
    const token = jwt.sign({username, role : "admin"}, `${process.env.SECRET_KEY_ADMIN}`, {expiresIn : "1h"});
    return token;
} 

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; 
        jwt.verify(token, `${process.env.SECRET_KEY_ADMIN}`, (err, admin) => {
            if (err) {
                res.status(401).json({message : "Unauthorized token"});
                return;
            }
            
            req.admin = admin;
            next();
        });
    }
    else {
        res.status(401).json({message : "Missing token"});
    }
}

module.exports = {generateAdminToken, authenticateAdmin};