const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const authRouter = require('./routers/auth_router');
const journalRouter = require('./routers/journal_router');
const questionRouter = require('./routers/question_router');
const replyRouter = require('./routers/reply_router');
const jwtValidator = require('./middleware/jwt_validation');
const errorHandler = require('./middleware/error_handler');

// sequelize.sync();
// console.log("All models were synchronized successfully.");

app = express();

app.use(bodyparser.json());

app.set('view engine', 'jade');

app.use(express.static("/Users/VioletZhou/Desktop/Writing hub/app/frontend"));

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

app.get('*/', (req, res) => {
    res.render('index');
});

app.use('/auth', authRouter);
app.use('/journals', jwtValidator, journalRouter);
//app.use('/questions', questionRouter);

app.use(errorHandler);

app.listen(3000, '127.0.0.1');