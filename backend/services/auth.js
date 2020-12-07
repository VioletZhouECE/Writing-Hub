const {jwtkey} = require('../config/config.js')
const jwt = require('jsonwebtoken');
const models = require('../models/index');

class Auth {
    constructor(){
        this.userModel = models.User;
        this.languageModel = models.Language;
    }

    async signup(username, password, userLearnLanguage, userFirstLanguage){
        try{
            //verify username does not exist
            await this.verifyUsernameNotExists(username);

            //retrieve language data
            const [learnLanguage, firstLanguage] = await Promise.all([this.languageModel.getLanguageByName(userLearnLanguage), this.languageModel.getLanguageByName(userFirstLanguage)]);

            //create user
            let user = await this.userModel.build({
                username: username,
                password: password
            });
            await user.storePasswordHash();
            await user.save();

            //set associations between user and language
            await Promise.all([user.setFirstLanguage(firstLanguage.id), user.setLearnLanguage(learnLanguage.id)]);

            return Promise.resolve();
        } catch (e){
            throw e;
        }
    }

    async login(username, password){
        try{
            //verify username 
            let user = await this.userModel.findOne({where : {username:username}})
            if (!user) {
                let err = new Error('Wrong username');
                err.statusCode = 401;
                throw err;
            }
            
            //verify password 
            const isValid = await user.isValidPassword(password);
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
                jwtkey,
                { expiresIn: '3h' }
            );

            const userData = {
                username: user.username,
                avatarUrl: user.avatarUrl,
                userId: user.id,
                firstLanguage: firstLanguageData[0].name,
                learnLanguage: learnLanguageData[0].name
            };

            return {userData, token};
    
        } catch (err){
            throw err;
        }
    }

    async verifyUsernameNotExists(username){
        try{
            const userExists = await this.userModel.usernameExists(username);
            if(userExists){
                let err = new Error('A user with the username already exists');
                err.statusCode = 422;
                throw err;
            }
        } catch (err){
            throw err;
        }
    }
}

module.exports = Auth;