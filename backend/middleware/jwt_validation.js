const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let authHeader = req.get('Authorization');

    //no authentication header
    if (!authHeader){
        let err = new Error('Not authenticated.');
        err.statusCode = 401;
        throw err;
    }

    let token = authHeader.split(' ')[1];
    let decodedToken;
    //decode failed
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch(err){
        err.statusCode = 500;
        throw err;
    }

    //decoded token is undefined
    if(!decodedToken){
        let err = new Error("Not authenticated");
        err.statusCode = 401;
        throw err;
    } 
        
    //extract userId from the token
    req.userId= decodedToken.userId;
    next();
}