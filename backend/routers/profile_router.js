const express = require("express");
const router = express.Router();
const {updateAvatar} = require("../controllers/profile_controller");

//avatar route
//PUT /avatar/:userId
router.post('/avatar/:userId', updateAvatar);

module.exports = router;