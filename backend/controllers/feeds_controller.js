const {getnJournalsByLanguage} = require("./journals_controller");
const {getnQuestionsByLanguage} = require("./questions_controller");

exports.getFeedsByLanguage = async (req, res, next) => {
    //return a mix of journals and questions
    const numOfJournals = Math.floor((Math.random() * 5));
    const numOfQuestions = 5 - numOfJournals;

    const journals = await getnJournalsByLanguage(numOfJournals)(req, res, next);
    const questions = await getnQuestionsByLanguage(numOfQuestions)(req, res, next);

    console.log(journals);
    console.log(questions);

    let response;
    response = {
        totalPosts: journals.length + questions.length,
        posts: [...journals, ...questions]
    }
    res.status(200).json(response);
}