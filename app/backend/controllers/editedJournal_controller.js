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
        const editedJournal = await models.EditedJournal.findOne({ where: { JournalId:  req.params.journalId}});
        if(editedJournal){
            await editedJournal.update({body: req.body.body});
        } else {
            await models.EditedJournal.create({
                body: req.body.body,
                JournalId:  req.params.journalId
            })
        }
        let response = {msg: "publish success"};
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}