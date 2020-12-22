const { Joi } = require('express-validation');

module.exports.feedValidation = {
    getFeedsByLanguage: {
        query: Joi.object({
            languageName: Joi.string()
            .valid('English','Simplified Chinese', 'Traditional Chinese', 'French', 'Japanese')
            .required(),

            lastJournalId: Joi.string()
            .guid({
                version: [
                    'uuidv4',
                    'uuidv5'
                ]})
            .required(),

            lastQuestionId: Joi.string()
            .guid({
                version: [
                    'uuidv4',
                    'uuidv5'
                ]})
            .required()
        })
    }
}