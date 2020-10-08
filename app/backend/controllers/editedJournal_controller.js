const models = require('../models/index');

//get editedJournal by journalId 
exports.getEditedJournalByJournalId = async (req, res, next) => {
    try{
        const editedJournal = await models.EditedJournal.findOne({where: {JournalId: req.params.journalId}});

        if(!editedJournal){
            return res.status(204).send();
        }
        const response = {editedJournal: editedJournal};
        return res.status(200).json(response); 
    } catch (err) {
        next(err);
    }
}

exports.updateEditedJournal = async (req, res, next) => {
    try {
        await models.EditedJournal.update({ body: req.body.body },{ where: { JournalId: req.params.journalId }});
        let response = {msg: "publish success"};
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}