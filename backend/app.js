const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const port = process.env.PORT || '3000';
const authRouter = require('./routers/auth_router');
const journalRouter = require('./routers/journal_router');
const editedJournalRouter = require('./routers/editedJournal_router');
const questionRouter = require('./routers/question_router');
const replyRouter = require('./routers/reply_router');
const jwtValidator = require('./middleware/jwt_validation');
const errorHandler = require('./middleware/error_handler');
const { Sequelize } = require('sequelize');

app = express();

app.use(bodyparser.json());

//static content serving
app.use(express.static(path.join(__dirname, "../frontend")));

//allow cross domain access
app.use((req, res, next) => {
   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/auth', authRouter);
app.use('/journals', jwtValidator, journalRouter);
app.use('/editedJournals', jwtValidator, editedJournalRouter);

app.get('*/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../frontend/static/index.html'));
});

app.use(errorHandler);

app.set('port', port);
app.listen(port);