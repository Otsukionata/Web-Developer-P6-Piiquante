// Dépendances
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Connexion à la base de données
const mongodb = require("./db");

// Import des routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
