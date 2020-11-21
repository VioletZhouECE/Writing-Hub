const express = require("express");
const router = express.Router();
const {getnQuestionsByLanguage, getQuestion, postQuestion, updateQuestion, deleteQuestion} = require("../controllers/questions_controller");

//GET /journals/all/langauge/:languageName & : lastPostId
router.get('/all/language', getnQuestionsByLanguage(5));

//GET /questions/:questionId
router.get('/:questionId', getQuestion);

//POST /questions
router.post('/', postQuestion);

//PUT /questions/:questionId
router.put('/:questionId', updateQuestion);

//DELETE /questions/:questionId
router.delete('/:questionId', deleteQuestion);

module.exports = router;