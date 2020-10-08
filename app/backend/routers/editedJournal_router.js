const express = require('express');
const router = express.Router();
const {getEditedJournalByJournalId, updateEditedJournal} = require('../controllers/editedJournal_controller');

//GET /editedtJournals/:journalId
router.get('/:journalId', getEditedJournalByJournalId);

//PUT /editedtJournals/:journalId
router.put('/:journalId', updateEditedJournal);

module.exports = router;