const models = require('../models/index');

exports.getJournalsByUser = (req, res, next) => {}

//version I: return journals written in the requested language in chronological order 
exports.getJournalsByLanguage= async (req, res, next) => {
    try{
        const pageNum = req.query.page || 1;
        //move this to config later 
        const perPage = 5;

        //retrieve languageId
        const language = await models.Language.getLanguageByName(req.query.languageName);

        //retrieve post data
        const {count, rows} = await models.Journal.findAndCountAll({order : [['createdAt', 'ASC']], offset: perPage*(pageNum-1), limit: perPage, where: {LanguageId:language.id}, include:models.User});
        const journals = rows;

        //send response
        let response;
        response = {
            totalPosts: count,
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

exports.incrementViewsCount = async (req, res, next) => {
    try{
        let journal = await models.Journal.findOne({where: {id:req.params.journalId}});
        if (!journal){
            let err = new Error(`the journal with journalId: ${journalId} does not exist in our database`);
            err.statusCode = 500;
            throw err;
        }
        journal.incrementViewsCount()
        await journal.save();
        res.status(200).send();
    } catch (err) {
        next(err);
    }
}

exports.deleteJournal= (req, res, next) => {}
