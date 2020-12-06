const express = require('express');
const router = express.Router();
const {validate} = require('express-validation');
const {authValidation} = require('../validator/auth');
const {verifyUsernameNotExists, signup, login} = require("../controllers/auth_controller");

router.get('/signup/:username', validate(authValidation.verifyUsernameNotExists, {keyByField: true}), verifyUsernameNotExists);

router.put('/signup', validate(authValidation.signup, {keyByField: true}), signup);

router.post('/login', validate(authValidation.login, {keyByField: true}), login);

module.exports = router;