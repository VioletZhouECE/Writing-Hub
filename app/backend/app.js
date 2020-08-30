const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

app = express();

app.use(bodyparser.json());

app.set('view engine', 'jade');

app.use(express.static("/Users/VioletZhou/Desktop/Writing hub/app/frontend"));

app.get('*/', (req, res) => {
    res.render('index');
})

app.listen(3000, '127.0.0.1');