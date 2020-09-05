const models = require('../models/index');

exports.getJournalsByUser = (req, res, next) => {}

//version I: return all journals written in the requested language
exports.getJournalsByLanguage= (req, res, next) => {
    const languageName = req.params.languageName;
     //retrieve LanguageId 
     models.Language.findOne({where: {name:languageName}})
     .then(language=>{
         //if language does not exist
         if(!language){
             let err = new Error(`the language: ${languageName} does not exist in our database`);
             err.statusCode = 500;
             throw err;
         }
         return models.Journal.findAll({where: {LanguageId:language.id}, include:models.User});
        }
     ).then(journals=>{
         if (journals.length==0){
             //no journal found - no content
             res.statusCode = 204;
             res.send();
         } else {
            res.statusCode = 200;
            let response;
            response = {
                posts: journals.map(journal=>(
                    {id: journal.id,
                     username: journal.User.username,
                     title: journal.title,
                     body: journal.body,
                     viewsCount: journal.viewsCount
                    }
                ))
            }
            res.json(response);      
         }
     })
     .catch(err=>
        next(err));
}

//get a single journal by id
exports.getJournal= (req, res, next) => {
    const journalId = req.params.journalId;
    models.Journal.findOne({where:{id: journalId}, include:[models.User, models.Language]})
    .then(journal=>{
        if (!journal){
            let err = new Error(`the journal with journalId: ${journalId} does not exist in our database`);
             err.statusCode = 500;
             throw err;
        }
        res.statusCode = 200;
        let response = {
            id: journal.id,
            createdAt: journal.createdAt,
            updatedAt: journal.updatedAt,
            username: journal.User.username,
            language: journal.Language.name,
            title: journal.title,
            body: journal.body,
            comment: journal.comment,
            viewsCount: journal.viewsCount
        }
        res.json(response);
    })
    .catch(err=>{
        next(err);
    })
}

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

exports.updateViewsCount = (req, res, next) => {
    const journalId = req.params.journalId; 
    models.Journal.findOne({where: {id:journalId}})
    .then(journal=>{
        if (!journal){
            let err = new Error(`the journal with journalId: ${journalId} does not exist in our database`);
             err.statusCode = 500;
             throw err;
        }
        return journal.update({viewsCount:journal.viewsCount+1});
    })
    .then(result=>{
        res.statusCode = 200;
        res.send();
    })
    .catch(err=>{
        next(err);
    })
}

exports.deleteJournal= (req, res, next) => {}
