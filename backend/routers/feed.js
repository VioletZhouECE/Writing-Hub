const express = require("express");
const router = express.Router();
const jwtValidator = require('../middleware/jwt_validation');
const {getFeedsByLanguage} = require('../controllers/feeds_controller');

router.get('/', jwtValidator, getFeedsByLanguage);

module.exports = router;