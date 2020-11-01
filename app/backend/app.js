const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const authRouter = require('./routers/auth_router');
const journalRouter = require('./routers/journal_router');
const editedJournalRouter = require('./routers/editedJournal_router');
const questionRouter = require('./routers/question_router');
const replyRouter = require('./routers/reply_router');
const jwtValidator = require('./middleware/jwt_validation');
const errorHandler = require('./middleware/error_handler');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('writing-hub-server', 'zhouxin', 'NJlymlym72!', {
  host: 'writing-hub.database.windows.net',
  dialect: 'mssql'
});

try {
  sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
  })
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app = express();

app.use(bodyparser.json());

app.set('view engine', 'jade');

app.use(express.static("../frontend"));

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
    res.render('index');
});

app.use(errorHandler);

app.listen(3000, '127.0.0.1');