const path = require('path');

const authRoutes = require("./auth");
const editedJournalRoutes = require("./editedJournal");
const journalRoutes = require("./journal");
const profileRoutes = require("./profile");
const questionRoutes = require("./question");
const {getFeedsByLanguage} = require("../controllers/feeds_controller");

module.exports = (app)=>{

    app.use('/api/auth', authRoutes);
    app.use('/api/profile', profileRoutes);
    app.use('/api/feeds', getFeedsByLanguage);
    app.use('/api/journals', journalRoutes);
    app.use('/api/questions', questionRoutes);
    app.use('/api/editedJournals', editedJournalRoutes);

    app.all('*', (req, res, next) => {
        res.status(200).sendFile(path.join(__dirname, '../../frontend/static/index.html'));
    });

    return app;
}