const models = require('../models/index');

class Auth {
    constructor(){
        this.userModel = models.User;
        this.languageModel = models.Language;
    }

    async signup(username, password, userLearnLanguage, userFirstLanguage){
        try{
            //verify username does not exist
            const userExists = await this.userModel.usernameExists(username);
            if (userExists){
                let err = new Error('A user with the username already exists');
                    err.statusCode = 422;
                    throw err;
                }

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
}

module.exports = Auth;