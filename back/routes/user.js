const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// Contrôleurs pour validité de l'email et de la force du mot de passe
// const email = require();
const password = require("../middleware/password");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
