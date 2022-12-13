const express = require("express");
const authenticator = require("../middleware/auth");

const sauceCtrl = require("../controllers/sauces");

const router = express.Router();

// Routes vers les logiques CRUD
router.post("/", authenticator, multer, sauceCtrl.createSauce);
router.get("/", authenticator, sauceCtrl.getAllSauces);
router.get("/:id", authenticator, sauceCtrl.getSauceById);
router.put("/:id", authenticator, multer, sauceCtrl.modifySauce);
router.delete("/:id", authenticator, multer, sauceCtrl.deleteSauce);

module.exports = router;
