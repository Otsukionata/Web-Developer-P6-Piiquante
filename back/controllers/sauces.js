// Import du modèle de création de nouvelle sauce
const Sauce = require("../models/Sauce");

// Fonction de création de sauce
exports.createSauce = (req, res, next) => {
  const sauceObj = JSON.parse(req.body.sauce);
  delete req.body._userId;
  const sauce = new Sauce({
    ...sauceObj,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Tableau contenant toutes les sauces enregistrées
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
