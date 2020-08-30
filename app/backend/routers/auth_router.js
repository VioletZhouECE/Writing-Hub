const express = require('express');
const router = express.Router();
const {signup, login} = require('../controllers/auth_controllers')

router.put('/signup', signup);

router.post('/login', login);

module.exports = router;