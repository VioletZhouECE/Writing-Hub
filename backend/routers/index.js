const path = require('path');

const authRoutes = require("./auth");
const editedJournalRoutes = require("./editedJournal");
const journalRoutes = require("./journal");
const profileRoutes = require("./profile");
const questionRoutes = require("./question");
const {getFeedsByLanguage} = require("../controllers/feeds_controller");

module.exports = (app)=>{

    app.use('/auth', authRoutes);
    app.use('/profile', profileRoutes);
    app.use('/feeds', getFeedsByLanguage);
    app.use('/journals', journalRoutes);
    app.use('/questions', questionRoutes);
    app.use('/editedJournals', editedJournalRoutes);

    app.all('*', (req, res, next) => {
        res.status(200).sendFile(path.join(__dirname, '../../frontend/static/index.html'));
    });

    return app;
}