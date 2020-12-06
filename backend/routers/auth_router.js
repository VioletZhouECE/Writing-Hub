const express = require('express');
const router = express.Router();
const {validate} = require('express-validation');
const {authValidation} = require('../validator/auth');
const {verifyUsernameNotExists, signup, login} = require("../controllers/auth_controller");

router.get('/signup/:username', verifyUsernameNotExists);

router.put('/signup', validate(authValidation.signup, {keyByField: true}), signup);

router.post('/login', login);

module.exports = router;