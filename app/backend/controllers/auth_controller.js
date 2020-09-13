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

//db method 
exports.verifyUsername = (req, res, next) => {
    models.User.findAll({where : {username:req.params.username}})
            .then(result => {
                if (result.length !== 0){
                    let err = new Error('A user with that username already exists');
                    err.statusCode = 422;
                    throw err;
                }
                res.statusCode = 200;
                res.send();
            })
            .catch(err=>{
                next(err);
            })
}

exports.signup = (req, res, next) => {
  let learnLanguageId;
  let firstLanguageId;
  let newUser;
  //retrieve languageId 
   models.Language.findOne({where: {name:req.body.learnLanguage}})
        .then(result=>{
                if (!result){
                    let err = new Error(`The language ${req.body.learnLanguage} does not exist in our database`);
                    err.statusCode = 422;
                    throw err;
                }
                learnLanguageId = result.id;
                return  models.Language.findOne({where: {name:req.body.firstLanguage}});
        })
        .then(async (result)=>{
                if (!result){
                    let err = new Error(`The language ${req.body.firstLanguage} does not exist in our database`);
                    err.statusCode = 422;
                    throw err;
                }
                firstLanguageId = result.id;
                let user = await models.User.build({
                    username: req.body.username,
                    password: req.body.password
                });
                await user.storePasswordHash();
                return await user.save();
        })
        .then(user => {
            newUser = user;
            return newUser.setFirstLanguage(firstLanguageId);
        })
        .then(()=> {
            return newUser.setLearnLanguage(learnLanguageId);
        })
        .then(() =>{
            res.statusCode = 201;
            //generate json web token
            const token = jwt.sign(
                { username: newUser.username,
                    userId: newUser.id.toString()
                },
                'FVFSRHGUH3QD',
                { expiresIn: '3h' }
                );

            let response = {
                msg : 'User created successfully!',
                userId: newUser.id.toString(),
                token: token
            }
            res.json(response);
        })
        .catch(err =>{
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
            }
        );
};