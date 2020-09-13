const models = require('../models/index');

exports.getJournalsByUser = (req, res, next) => {}

//version I: return all journals written in the requested language
exports.getJournalsByLanguage= async (req, res, next) => {
    try{
        const language = await models.Language.getLanguageByName(req.params.languageName);
        const journals = await models.Journal.findAll({where: {LanguageId:language.id}, include:models.User});
        if (journals.length==0){
            //no journal found - no content
            res
            res.json(204).send();
        } 
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
        res.status(200).json(response); 
    } catch(err) {
        next(err);
    };
}

//get a single journal by id
exports.getJournal= async (req, res, next) => {
    try{
        const journal = await models.Journal.findOne({where:{id: req.params.journalId}, include:[models.User]});
        if (!journal){
            let err = new Error(`the journal with journalId: ${journalId} does not exist in our database`);
            err.statusCode = 500;
            throw err;
        }
        let learnLanguageData = await journal.User.getLearnLanguage();
        let response = {
            id: journal.id,
            createdAt: journal.createdAt,
            updatedAt: journal.updatedAt,
            username: journal.User.username,
            learnLanguage: learnLanguageData[0].name,
            title: journal.title,
            body: journal.body,
            comment: journal.comment,
            viewsCount: journal.viewsCount
        }
        res.status(200).json(response);
    } catch(err){
        next(err);
    }
}

exports.postJournal= async (req, res, next) => {
    try{
        const language = await models.Language.getLanguageByName(req.body.language);
        await models.Journal.create({
            UserId: req.userId,
            LanguageId: language.id,
            title: req.body.title,
            body: req.body.body,
            comment: req.body.comment
        });
        let response = {msg: "publish success"};
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
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
