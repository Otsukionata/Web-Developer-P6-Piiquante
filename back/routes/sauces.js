const express = require("express");
const authenticator = require("../middleware/auth");

const sauceCtrl = require("../controllers/sauces");

const router = express.Router();

router.post("/", authenticator, sauceCtrl.createSauces);
router.get("/", authenticator, sauceCtrl.getAllSauces);

module.exports = router;