const models = require('../models/index');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth');
const {errorWrapper} = require("../middleware/error_wrapper");

exports.login = async (req, res, next) => {
    try{
        //verify username 
        let user = await models.User.findOne({where : {username:req.body.username}})
        if (!user) {
            let err = new Error('Wrong username');
            err.statusCode = 401;
            throw err;
        }
        
        //verify password 
        const isValid = await user.isValidPassword(req.body.password);
        if (!isValid){
            let err = new Error('Wrong password');
            err.statusCode = 401;
            throw err;
        }

        //retrieve language data
        //to-do: use eager loading here
        const [firstLanguageData, learnLanguageData] = await Promise.all([user.getFirstLanguage(), user.getLearnLanguage()]);

        //generate json web token
        const token = jwt.sign(
            { username: user.username,
              userId: user.id
            },
            process.env.JWT_KEY,
            { expiresIn: '3h' }
        );

        //send response
        let response = {
            msg : 'authentication succeeded!',
            username: user.username,
            avatarUrl: user.avatarUrl,
            userId: user.id,
            token: token,
            firstLanguage: firstLanguageData[0].name,
            learnLanguage: learnLanguageData[0].name
        };
        res.status(200).json(response);

    } catch (err){
        next (err);
    }
}

exports.verifyUsernameNotExists = async (req, res, next) => {
    try{
        const userExists = await models.User.usernameExists(req.params.username);
        console.log(userExists);
        if (userExists){
            let err = new Error('A user with the username already exists');
                err.statusCode = 422;
                throw err;
            }
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