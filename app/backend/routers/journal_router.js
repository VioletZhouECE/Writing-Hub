const router = express.Router();

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