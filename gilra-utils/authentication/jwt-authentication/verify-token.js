var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = `${process.env.X_ACCESS_TOKEN}`

function verifyToken(req, res, next) {
    
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({auth: false, message: 'No Token Provided'});
    }

    jwt.verify(token, secret, function(err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token'});
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;

