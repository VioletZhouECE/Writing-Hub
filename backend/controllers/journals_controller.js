const models = require('../models/index');
const journalService = require('../services/journal');

exports.getJournalsByUser = (req, res, next) => {}

//return n journals written in the requested language in chronological order 
//this is not a controller, just used internally by getFeedsByLanguage
exports.getnJournalsByLanguage = (n) => {
    const perPage = n? n:5;
    return async (req, res, next) => {
        try{
            const lastPostId = req.query.lastJournalId;
    
            //retrieve languageId
            const language = await models.Language.getLanguageByName(req.query.languageName);
    
            //get createdAt for lastPostId
            let offset = 0;
            if (lastPostId != ""){
                const lastPost = await models.Journal.findOne({where:{'id' : lastPostId}});
                const lastCreatedAt = lastPost.createdAt;
                //get the offset based on lastCreatedAt
                offset = await models.Journal.count({where:{'createdAt' : {[Op.lte]: lastCreatedAt}, LanguageId:language.id}});
            }
    
            //retrieve post data
            const {count, rows} = await models.Journal.findAndCountAll({order : [['createdAt', 'ASC']], offset: offset, limit: perPage, where: {LanguageId:language.id}, include:models.User});
            const journals = rows;
    
            
            const posts = journals.map(journal=>(
                    {   
                        type: "journal",
                        id: journal.id,
                        username: journal.User.username,
                        avatarUrl: journal.User.avatarUrl,
                        createdAt: journal.createdAt,
                        title: journal.title,
                        body: journal.body,
                        count: journal.viewsCount
                    }
                ))

            return {totalJournals: count, journals: posts};
        } catch(err) {
            next(err);
        };
    }
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
            avatarUrl: journal.User.avatarUrl,
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
        const {language, title, body, comment} = req.body;
        const {userId} = req;
        const journalServiceInstance = new journalService();
        await journalServiceInstance.postJournal(userId, language, title, body, comment);
        const response = {msg: "public success"};
        res.status(200).json(response);
    } catch (err){
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
