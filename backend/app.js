const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const port = process.env.PORT || '3000';
const authRouter = require('./routers/auth_router');
const profileRouter = require('./routers/profile_router');
const journalRouter = require('./routers/journal_router');
const editedJournalRouter = require('./routers/editedJournal_router');
const questionRouter = require('./routers/question_router');
const {getFeedsByLanguage} = require('./controllers/feeds_controller');
const jwtValidator = require('./middleware/jwt_validation');
const errorHandler = require('./middleware/error_handler');

//multer middleware to extract images
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type is not correct"), false);
  }
};
const uploadStrategy = multer({ storage: inMemoryStorage, fileFilter: fileFilter}).single('image');

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
app.post('/profile', jwtValidator, uploadStrategy, profileRouter);
app.get('/feeds', jwtValidator, getFeedsByLanguage);
app.use('/journals', jwtValidator, journalRouter);
app.use('/questions', jwtValidator, questionRouter);
app.use('/editedJournals', jwtValidator, editedJournalRouter);

app.get('*/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../frontend/static/index.html'));
});

app.use(errorHandler);

app.set('port', port);
app.listen(port);