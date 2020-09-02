const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const authRouter = require('./routers/auth_router');
const postRouter = require('./routers/post_router');
const replyRouter = require('./routers/reply_router');
const {sequelize} = require('./models/index');

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
app.use('/posts', postRouter);
app.use('/replies', replyRouter);

app.listen(3000, '127.0.0.1');