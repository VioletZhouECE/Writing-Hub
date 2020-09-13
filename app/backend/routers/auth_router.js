const express = require('express');
const router = express.Router();
const {verifyUsernameNotExists, signup, login} = require("../controllers/auth_controller");

router.get('/signup/:username', verifyUsernameNotExists);

router.put('/signup', signup);

router.post('/login', login);

module.exports = router;