const express = require("express");

const sauceCtrl = require("../controllers/sauces");

const router = express.Router();

router.post("/", sauceCtrl.createSauces);
router.get("/", sauceCtrl.getAllSauces);

module.exports = router;