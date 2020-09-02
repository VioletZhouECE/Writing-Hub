const express = require('express');
const router = express.Router();
const {getJournals, getJournal, postJournal, updateJournal, deleteJournal} = require('../controllers/journals_controller');

//GET /journals
router.get('/', getJournals);

//GET /journals/:journalId
router.get('/:journalId', getJournal);

//POST /journals
router.post('/', postJournal);

//PUT /journals/:journalId
router.put('/:journalId', updateJournal);

//DELETE /journals/:journalId
router.delete('/:journalId', deleteJournal);

module.exports = router;