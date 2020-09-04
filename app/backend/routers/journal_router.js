const express = require('express');
const router = express.Router();
const {getJournals, getJournal, postJournal, updateJournal, deleteJournal} = require('../controllers/journals_controller');

//GET /journals/all/langauge/:languageName
router.get('/all/user/:userId', getJournals);

//GET /journals/all/langauge/:languageName
router.get('/all/language/:languageName', getJournals);

//GET /journals/:journalId
router.get('/:journalId', getJournal);

//POST /journals
router.post('/', postJournal);

//PUT /journals/:journalId
router.put('/:journalId', updateJournal);

//DELETE /journals/:journalId
router.delete('/:journalId', deleteJournal);

module.exports = router;