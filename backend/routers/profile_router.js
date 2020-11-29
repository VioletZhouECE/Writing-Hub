const express = require("express");
const router = express.Router();
const {updateAvatar, deleteAvatar} = require("../controllers/profile_controller");

//avatar routes
//PUT /avatar/:userId
router.get('/avatar/:userId', updateAvatar);

//DELETE /avatar/:userId
router.delete('/avatar/:userId', deleteAvatar);

module.exports = router;