const express = require("express");
const router = express.Router();
const {updateAvatar} = require("../controllers/profile_controller");

//avatar route
//PUT /avatar
router.put('/avatar', updateAvatar);

module.exports = router;