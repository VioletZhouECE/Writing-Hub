const models = require('../models/index');
const journalService = require('../services/journal');

exports.getJournalsByUser = (req, res, next) => {}

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
