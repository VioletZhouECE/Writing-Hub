const express = require('express');
const router = express.Router();
const {signup} = require("../controllers/auth_controller");
const {login} = require("../controllers/auth_controller");

router.put('/signup', signup);

router.post('/login', login);

module.exports = router;