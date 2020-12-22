const journalService = require('../services/journal');
const {getnQuestionsByLanguage} = require("./questions_controller");

exports.getFeedsByLanguage = async (req, res, next) => {
    //return a mix of journals and questions
    const numOfJournals = Math.floor((Math.random() * 5));
    const numOfQuestions = 5 - numOfJournals;

    //get required fields from req.query
    const languageName = req.query.languageName;
    const lastJournalId = req.query.lastJournalId;
    const lastQuestionId = req.query.lastQuestionId;


    const journalServiceInstance = new journalService();

    const [{totalJournals, journals}, {totalQuestions, questions}] = await Promise.all([journalServiceInstance.getnJournalsByLanguage(numOfJournals, languageName, lastJournalId), getnQuestionsByLanguage(numOfQuestions)(req, res, next)]);

    let response;
    response = {
        totalPosts: totalJournals + totalQuestions,
        posts: [...journals, ...questions]
    }

    res.status(200).json(response);
}