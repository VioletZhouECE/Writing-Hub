const authService = require('../services/auth');

exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const authServiceInstance = new authService();
        const {userData, token} = await authServiceInstance.login(username, password);
        const response = {
            ...userData,
            token: token
        };
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

exports.verifyUsernameNotExists = async (req, res, next) => {
    try{
        const {username} = req.params;
        const authServiceInstance = new authService();
        await authServiceInstance.verifyUsernameNotExists(username);
        res.status(200).send();
    } catch (err){
        next(err);
    }
}


exports.signup = async (req, res, next) => {
    try{
        const {username, password, learnLanguage, firstLanguage} = req.body;
        const authServiceInstance = new authService();
        await authServiceInstance.signup(username, password, learnLanguage, firstLanguage);
        res.status(201).send();
    } catch (err){
        next(err);
    }
};