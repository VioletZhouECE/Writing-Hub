const express = require("express");
const router = express.Router();
const {validate} = require('express-validation');
const {getJournalsByUser, getJournal, postJournal, updateJournal, deleteJournal, incrementViewsCount} = require('../controllers/journals_controller');
const jwtValidator = require('../middleware/jwt_validation');
const {journalValidation} = require('../validator/journal');

//to-do: req.params validator 
//GET /journals/all/user/:userId
router.get('/all/user/:userId', jwtValidator, getJournalsByUser);

//to-do: req.params validator 
//GET /journals/:journalId
router.get('/:journalId', jwtValidator, getJournal);

//POST /journals
router.post('/', jwtValidator, validate(journalValidation.postJournal, {keyByField: true}), postJournal);

//PUT /journals/:journalId
router.put('/:journalId', jwtValidator, updateJournal);

//to-do: req.params validator 
router.patch('/:journalId/updateViewsCount', jwtValidator, incrementViewsCount);

//DELETE /journals/:journalId
router.delete('/:journalId', jwtValidator, deleteJournal);

module.exports = router;