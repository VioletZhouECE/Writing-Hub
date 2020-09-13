const express = require('express');
const router = express.Router();
const {getJournalsByUser, getJournalsByLanguage, getJournal, postJournal, updateJournal, deleteJournal, incrementViewsCount} = require('../controllers/journals_controller');

//GET /journals/all/langauge/:languageName
router.get('/all/user/:userId', getJournalsByUser);

//GET /journals/all/langauge/:languageName
router.get('/all/language/:languageName', getJournalsByLanguage);

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