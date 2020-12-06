const { Joi } = require('express-validation')

module.exports.authValidation = {
    signup: {
        body: Joi.object({
            username: Joi.string()
            .min(2)
            .max(10)
            .required(),

            password: Joi.string()
            .min(6)
            .max(12)
            .required(),

            learnLanguage: Joi.string()
            .valid('English','Simplified Chinese', 'Traditional Chinese', 'French', 'Japanese')
            .required(),

            firstLanguage: Joi.string()
            .valid('English','Simplified Chinese', 'Traditional Chinese', 'French', 'Japanese')
            .required()
        })
  },

  login : {
    body: Joi.object({
        username: Joi.string()
        .required(),

        password: Joi.string()
        .required(),
  })
},

  verifyUsernameNotExists : {
    params: Joi.object({
        username: Joi.string()
        .required()
    })
  }
}
  