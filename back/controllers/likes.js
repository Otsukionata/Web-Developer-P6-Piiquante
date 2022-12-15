const Sauce = require("../models/Sauce");

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (req.body.like) {
        case 1:
          // Ajout d'un pouce vert
          if (!sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
              }
            )
              .then(() =>
                res.status(201).json({ message: "Like pris en compte." })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        //   Retrait d'un like ou d'un dislike
        case 0:
          //   Retrait du like
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Like retiré." }))
              .catch((error) => res.status(400).json({ error }));
          }
          //   Retrait du like
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Dislike retiré." }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case -1:
          //   Ajout d'un pouce rouge
          if (!sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
              }
            )
              .then(() =>
                res.status(201).json({ message: "Dislike pris en compte." })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => req.status(404).json({ error }));
};
