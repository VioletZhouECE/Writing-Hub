const models = require('../models/index');
const jwt = require('jsonwebtoken');
const jwtkey = require('../config/jwtkey');

exports.login = (req, res, next) => {
    //retrieve user from db 
    models.User.findAll({where : {username:req.body.username,
                                  password:req.body.password}})
                .then(result => {
                if (result.length === 0){
                    let err = new Error('Wrong username or password');
                    err.statusCode = 401;
                    throw err;
                } else {
                        let login_user = result[0];
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
                            token: token
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

exports.signup = (req, res, next) => {
   //retrieve validator result
   //skip for now
   //retrieve user from db
    models.User.findAll({where : {username:req.body.username}})
            .then(result => {
                if (result.length !== 0){
                    let err = new Error('A user with that username already exists');
                    err.statusCode = 422;
                    throw err;
                } else {
                    //create a new user in db
                    return models.User.create({
                        username: req.body.username,
                        //to-do: use bcrypt
                        password: req.body.password
                    })
                }
            })
            //send back response
            .then(user =>{
                res.statusCode = 201;
                //generate json web token
                const token = jwt.sign(
                    { username: user.username,
                      userId: user.id.toString()
                    },
                    'FVFSRHGUH3QD',
                    { expiresIn: '3h' }
                  );

                let response = {
                    msg : 'User created successfully!',
                    userId: user.id.toString(),
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