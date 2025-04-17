const express = require("express");

const router = express.Router();

const { loginMicrosoft, loginCallback, userInfo, logout } = require("../controllers/auth");
const { validarPrimerAdmin } = require("../middlewares/validations");

router.get("/microsoft", loginMicrosoft);
router.get("/microsoft/callback", [validarPrimerAdmin], loginCallback);
router.get("/user-info", userInfo);

router.post("/logout", logout)

module.exports = router;
