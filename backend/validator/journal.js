const { Joi } = require('express-validation');

module.exports.journalValidation = {
    postJournal: {
        body: Joi.object({
            title: Joi.string()
            .required(),

            body: Joi.string()
            .required(),

            comment: Joi.string()
            .required(),

            language: Joi.string()
            .valid('English','Simplified Chinese', 'Traditional Chinese', 'French', 'Japanese')
            .required()
        })
    }
}