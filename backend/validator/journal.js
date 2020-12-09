const { Joi } = require('express-validation');

module.exports.journalValidation = {
    getJournal: {
        params: Joi.object({
            journalId: Joi.string()
            .required()
        })
    },
  }