const express = require("express");
const router = express.Router();
const {getJournalsByUser, getJournal, postJournal, updateJournal, deleteJournal, incrementViewsCount} = require('../controllers/journals_controller');
const jwtValidator = require('../middleware/jwt_validation');

//GET /journals/all/langauge/:languageName
router.get('/all/user/:userId', jwtValidator, getJournalsByUser);

//GET /journals/:journalId
router.get('/:journalId', jwtValidator, getJournal);

//POST /journals
router.post('/', jwtValidator, postJournal);

//PUT /journals/:journalId
router.put('/:journalId', jwtValidator, updateJournal);

router.patch('/:journalId/updateViewsCount', jwtValidator, incrementViewsCount);

//DELETE /journals/:journalId
router.delete('/:journalId', jwtValidator, deleteJournal);

module.exports = router;