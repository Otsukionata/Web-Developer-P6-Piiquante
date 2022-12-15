// Contrôle de la force du mot de passe
const PasswordValidator = require("password-validator");
const PasswordSchema = new PasswordValidator();

/* Configuration des points de contrôle
Le mot de passe ne doit contenir aucun espace
Symboles acceptés : [~#*-_=+±%`"',;.!?|@<({^/\&§})>€$£¥₹] ainsi que les caractères accentués */

PasswordSchema
    .is().min(8, ["Minimum 8 caractères"])
    .is().max(50, ["Maximum 50 caractères"])
    .has().uppercase(2, ["Minimum 2 lettres MAJUSCULES"])
    .has().lowercase(2, ["Minimum 2 lettres minuscules"])
    .has().digits(2, ["Minimum 2 chiffres"])
    .has().symbols(2, ["Minimum 2 symboles parmi ceux cités ci-dessus"])
    .has().not().space()
    .is().not().oneOf(["azerty123456", "123456"]);

module.exports = (req, res, next) => {
    if (PasswordSchema.validate(req.body.password)) {
        next();
    } else {
        res.status(401).json(PasswordSchema.validate(req.body.password, {details: true}));
    }
}