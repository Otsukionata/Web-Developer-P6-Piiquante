require("dotenv").config()

const mongoose = require('mongoose');

const password = process.env.DB_PASSWORD;
const username = process.env.DB_USER;
const db = process.env.DB_NAME;
const uri = `mongodb+srv://${username}:${password}@${db}.iqrq2k7.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((err) => console.error("Échec de connexion à MongoDB…", err))

module.exports = { mongoose };