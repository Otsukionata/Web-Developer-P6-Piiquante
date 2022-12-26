const multer = require("multer");

// Création du dictionnaire d'extensions des formats d'images acceptés par le site
const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Enregistrement du fichier image
const storage = multer.diskStorage({
  // Lieu de stockage
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // Renommage de l'image prenant en compte le nom d'origine
  // Règles de renommage : Remplacement des espaces par l'underscore, le retrait/déplacement de l'extension avec le point afin d'ajouter la date en millisecondes
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(" ")
      .join("_")
      .replace(MIME_TYPE[file.mimetype], "")
      .replace(".", "");
    const extension = MIME_TYPE[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
