const {getnJournalsByLanguage} = require("./journals_controller");
const {getnQuestionsByLanguage} = require("./questions_controller");

exports.getFeedsByLanguage = async (req, res, next) => {
    //return a mix of journals and questions
    const numOfJournals = Math.floor((Math.random() * 5));
    const numOfQuestions = 5 - numOfJournals;

    const [{totalJournals, journals}, {totalQuestions, questions}] = await Promise.all([getnJournalsByLanguage(numOfJournals)(req, res, next), getnQuestionsByLanguage(numOfQuestions)(req, res, next)]);

    let response;
    response = {
        totalPosts: totalJournals + totalQuestions,
        posts: [...journals, ...questions]
    }

    res.status(200).json(response);
}