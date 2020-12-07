const express = require("express");
const router = express.Router();
const {getQuestion, postQuestion, updateQuestion, deleteQuestion} = require("../controllers/questions_controller");
const jwtValidator = require('../middleware/jwt_validation');

//GET /questions/:questionId
router.get('/:questionId', jwtValidator, getQuestion);

//POST /questions
router.post('/', jwtValidator, postQuestion);

//PUT /questions/:questionId
router.put('/:questionId', jwtValidator, updateQuestion);

//DELETE /questions/:questionId
router.delete('/:questionId', jwtValidator, deleteQuestion);

module.exports = router;