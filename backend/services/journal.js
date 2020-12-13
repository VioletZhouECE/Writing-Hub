const models = require('../models/index');

class Journal {
    constructor(){
        this.userModel = models.User;
        this.journalModel = models.Journal;
        this.languageModel = models.Language;
    }

    async postJournal(userId, postLanguage, title, body, comment){
        try{
            const language = await this.languageModel.getLanguageByName(postLanguage);
            await this.journalModel.create({
                UserId: userId,
                LanguageId: language.id,
                title: title,
                body: body,
                comment: comment
            });
            return Promise.resolve();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Journal;