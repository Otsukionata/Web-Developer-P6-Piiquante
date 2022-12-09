const express = require("express");
const authenticator = require("../middleware/auth");

const sauceCtrl = require("../controllers/sauces");

const router = express.Router();

router.get("/", authenticator, sauceCtrl.getAllSauces);
router.post("/", authenticator, multer, sauceCtrl.createSauce);

module.exports = router;
