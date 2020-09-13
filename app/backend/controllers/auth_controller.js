const models = require('../models/index');
const jwt = require('jsonwebtoken');
const jwtkey = require('../config/jwtkey');
const {wrapper} = require("../middleware/error_handling_wrapper");

exports.login = (req, res, next) => {
    //retrieve user from db 
    models.User.findOne({where : {username:req.body.username}})
                .then(async (result) => {
                if (!result){
                    let err = new Error('Wrong username');
                    err.statusCode = 401;
                    throw err;
                } else {
                    //verify password
                    const isValid = await result.isValidPassword(req.body.password);
                    console.log(isValid);
                    if (!isValid){
                        let err = new Error('Wrong password');
                        err.statusCode = 401;
                        throw err;
                    }
                        let login_user = result;
                        const firstLanguageData = await login_user.getFirstLanguage();
                        const learnLanguageData = await login_user.getLearnLanguage();
                        //generate json web token
                        const token = jwt.sign(
                            { username: login_user.username,
                              userId: login_user.id.toString()
                            },
                            jwtkey,
                            { expiresIn: '3h' }
                          );
                        res.statusCode = 200;
                        let response = {
                            msg : 'authentication succeeded!',
                            userId: login_user.id.toString(),
                            token: token,
                            firstLanguage: firstLanguageData[0].name,
                            learnLanguage: learnLanguageData[0].name
                        }
                        res.json(response);
                    }
                })
                .catch(err =>{
                    if (!err.statusCode){
                        err.statusCode = 500;
                    }
                    next(err);
                    }
                );

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
        //verify username does not exist
        const userExists = await models.User.usernameExists(req.body.username);
        if (userExists){
            let err = new Error('A user with the username already exists');
                err.statusCode = 422;
                throw err;
            }

        //retrieve language data
        const learnLanguage = await models.Language.getLanguageByName(req.body.learnLanguage);
        const firstLanguage = await models.Language.getLanguageByName(req.body.firstLanguage);

        //create user
        let user = await models.User.build({
            username: req.body.username,
            password: req.body.password
        });
        await user.storePasswordHash();
        await user.save();

        //set associations between user and language
        await user.setFirstLanguage(firstLanguage.id);
        await user.setLearnLanguage(learnLanguage.id);

        res.status(201).json(response);
    } catch (err){
        next(err);
    }
};