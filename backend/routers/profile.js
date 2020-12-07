const express = require("express");
const router = express.Router();
const {updateAvatar} = require("../controllers/profile_controller");
const jwtValidator = require('../middleware/jwt_validation');

//avatar route
//PUT /avatar
router.put('/avatar', jwtValidator, updateAvatar);

module.exports = router;