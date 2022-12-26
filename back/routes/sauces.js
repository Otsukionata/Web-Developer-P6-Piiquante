const express = require("express");

// Système d'authentification à inclure à toutes les routes
const authenticator = require("../middleware/auth");

const router = express.Router();

// Importation des routes
const sauceCtrl = require("../controllers/sauces");
const { likeSauce } = require("../controllers/likes");

// Routes CRUD
router.post("/", authenticator, multer, sauceCtrl.createSauce);
router.get("/", authenticator, sauceCtrl.getAllSauces);
router.get("/:id", authenticator, sauceCtrl.getSauceById);
router.put("/:id", authenticator, multer, sauceCtrl.modifySauce);
router.delete("/:id", authenticator, multer, sauceCtrl.deleteSauce);

// Route du système de like/dislike
router.post("/:id/like", authenticator, likeSauce);

module.exports = router;
