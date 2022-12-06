// const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

const Sauce = require("../models/Sauce");

exports.createSauces = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet enregistré !" }))
        .catch(error => res.status(400).json({ error }));
};

// Exemple de tableau : à enlever dès que possible
exports.getAllSauces = (req, res, next) => {
    const sauce = [
        {
            userId: "123456789_",
            name: "Pesto",
            manufacturer: "Artur Rutkowski",
            description: "Sauce pesto maison",
            mainPepper: "Basilic",
            imageUrl: "https://unsplash.com/photos/2lEoPVy3oJ0",
            heat: 1,
            likes: 5,
            dislikes: 1,
            usersLikes: ["String <userId>"],
            usersDislikes: ["String <userId>"]
        },
        {
            userId: "1234567890_",
            name: "Tabasco",
            manufacturer: "McIlhenny Co",
            description: "Bouteille de Tabasco",
            mainPepper: "Piment",
            imageUrl: "https://unsplash.com/photos/jbsUDKCIKrg",
            heat: 10,
            likes: 6,
            dislikes: 2,
            usersLikes: ["String <userId>"],
            usersDislikes: ["String <userId>"]
        }
    ];
    res.status(200).json(sauce);
}