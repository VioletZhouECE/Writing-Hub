const express = require("express");
const router = express.Router();
const {getQuestions, getQuestion, postQuestion, updateQuestion, deleteQuestion} = require("../controllers/questions_controller");

//GET /questions
router.get('/', getQuestions);

//GET /questions/:questionId
router.get('/:questionId', getQuestion);

//POST /questions
router.post('/', postQuestion);

//PUT /questions/:questionId
router.put('/:questionId', updateQuestion);

//DELETE /questions/:questionId
router.delete('/:questionId', deleteQuestion);

module.exports = router;