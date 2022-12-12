// Dépendances
const bcrypt = require("bcrypt");
const jwtokn = require("jsonwebtoken");
const cryptoJs = require("crypto-js");

// Import du modèle de fichier pour new user
const User = require("../models/User");

// Inscription
exports.signup = (req, res, next) => {
  // Chiffrement de l'adresse mail avec crypto-Js
  const encryptMail = cryptoJs.HmacSHA256(
    req.body.email,
    `${process.env.CRYPTO_MAIL}`
  );

  // Chiffrement du mot de passe avec bcrypt
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({ email: encryptMail, password: hash });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Enregistrement réussi !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Identification
exports.login = (req, res, next) => {
  const encryptMail = cryptoJs.HmacSHA256(
    req.body.email,
    `${process.env.CRYPTO_MAIL}`
  );

  User.findOne({ email: encryptMail })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Identifiant et/ou mot de passe incorrect" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Mot de passe incorrect" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwtokn.sign(
                  {
                    userId: user._id,
                  },
                  process.env.JWT_TOKEN,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
