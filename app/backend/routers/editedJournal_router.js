const express = require('express');
const router = express.Router();
const {getEditedJournalByJournalId, postEditedJournal} = require('../controllers/editedJournal_controller');

//GET /editedtJournals/:journalId
router.get('/:journalId', getEditedJournalByJournalId);

//POST /editedtJournals
router.post('/', postEditedJournal);

module.exports = router;