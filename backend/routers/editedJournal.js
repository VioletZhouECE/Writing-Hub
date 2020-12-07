const express = require('express');
const router = express.Router();
const {getEditedJournalByJournalId, updateEditedJournal} = require('../controllers/editedJournal_controller');
const jwtValidator = require('../middleware/jwt_validation');

//GET /editedtJournals/:journalId
router.get('/:journalId', jwtValidator, getEditedJournalByJournalId);

//PUT /editedtJournals/:journalId
router.put('/:journalId', jwtValidator, updateEditedJournal);

module.exports = router;