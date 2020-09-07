const express = require('express');
const router = express.Router();
const {verifyUsername, signup, login} = require("../controllers/auth_controller");

router.get('/signup/:username', verifyUsername);

router.put('/signup', signup);

router.post('/login', login);

module.exports = router;