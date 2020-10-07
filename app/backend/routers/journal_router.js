const express = require('express');
const router = express.Router();
const {getJournalsByUser, getEditedJournalByJournalId, getJournalsByLanguage, getJournal, postJournal, updateJournal, deleteJournal, incrementViewsCount} = require('../controllers/journals_controller');

//GET /journals/all/langauge/:languageName
router.get('/all/user/:userId', getJournalsByUser);

//GET /journals/all/langauge/:languageName
router.get('/all/language', getJournalsByLanguage);

//to-do: might move to another router
//GET /journals/editedJournal/:journalId
router.get('/editedJournal/:journalId', getEditedJournalByJournalId)

//GET /journals/:journalId
router.get('/:journalId', getJournal);

//POST /journals
router.post('/', postJournal);

//PUT /journals/:journalId
router.put('/:journalId', updateJournal);

router.patch('/:journalId/updateViewsCount', incrementViewsCount);

//DELETE /journals/:journalId
router.delete('/:journalId', deleteJournal);

module.exports = router;