const models = require('../models/index');

exports.getQuestions = async (req, res, next) => {
}

exports.getQuestion = async (req, res, next) => {
}

exports.postQuestion= async (req, res, next) => {
    try{
        const language = await models.Language.getLanguageByName(req.body.language);
        await models.Question.create({
            UserId: req.userId,
            LanguageId: language.id,
            title: req.body.title,
            body: req.body.body
        });
        let response = {msg: "publish success"};
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

exports.updateQuestion = async (req, res, next) => {
}

exports.deleteQuestion = async (req, res, next) => {
}