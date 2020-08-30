const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const authRouter = require('./routers/auth_router');

app = express();

app.use(bodyparser.json());

app.set('view engine', 'jade');

app.use(express.static("/Users/VioletZhou/Desktop/Writing hub/app/frontend"));

app.get('*/', (req, res) => {
    res.render('index');
})

app.use('./auth', authRouter)

app.listen(3000, '127.0.0.1');