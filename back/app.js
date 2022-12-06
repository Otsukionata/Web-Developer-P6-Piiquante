const express = require("express");
const cors = require("cors");
const mongodb = require("./db");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;