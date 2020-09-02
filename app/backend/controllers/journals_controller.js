const models = require('../models/index');

exports.getJournals= (req, res, next) => {}

exports.getJournal= (req, res, next) => {}

exports.postJournal= (req, res, next) => {
    const userId = req.userId;
    //retrieve LanguageId
    models.Language.findOne({where: {name:req.body.language}})
    .then(language=>{
        //if language does not exist
        if(!language){
            let err = new Error(`the language: ${req.body.language} does not exist in our database`);
            err.statusCode = 500;
            throw err;
        }
        //add journal to the database
        return models.Journal.create({
            UserId: userId,
            LanguageId: language.id,
            title: req.body.title,
            body: req.body.body,
            comment: req.body.comment
        })
    }).then(journal=>{
        res.statusCode = 200;
        let response = {
            msg: "publish success"
        }
        res.json(response);
    }).catch(err=>{
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.updateJournal= (req, res, next) => {}

exports.deleteJournal= (req, res, next) => {}
