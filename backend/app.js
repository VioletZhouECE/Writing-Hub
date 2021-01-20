const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const port = process.env.PORT || '3000';
const routes = require('./routers');
const errorHandler = require('./middleware/error_handler');

app = express();

app.use(bodyparser.json({ limit: "500kb" }));

app.use(bodyparser.urlencoded({extended: true}));

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

routes(app);

app.use(errorHandler);

app.set('port', port);
app.listen(port);