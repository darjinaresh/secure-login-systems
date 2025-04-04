const { loginUser, getUserProfile } = require("../controller/userController");

const router = require("express").Router();

router.post("/login", loginUser);

router.get("/profile", getUserProfile);

module.exports = router;
