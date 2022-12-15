// Import du modèle de création de nouvelle sauce
const Sauce = require("../models/Sauce");

// Dépendance pour la suppression de fichiers (ici : images)
const fs = require("fs");

// Fonction de création de sauce
exports.createSauce = (req, res, next) => {
  const sauceObj = JSON.parse(req.body.sauce);
  delete req.body._userId;

  // Affectation d'une URL à l'image nouvellement créée
  const sauce = new Sauce({
    ...sauceObj,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  // Sauvegarde de la sauce ou erreur le cas échéant
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

// Page affichant une seule sauce en utilisant son identifiant
exports.getSauceById = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch(res.status(404).json({ message: "Sauce introuvable…" }));
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({ _id: res.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Autorisation refusée !" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink("images/" + filename, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce liquidée !" }))
            .catch((error) => res.status(404).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
