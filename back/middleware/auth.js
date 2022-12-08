const jwtokn = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwtokn.verify(token, process.env.JWT_TOKEN);
        const userId = decodeToken.userId;
        req.auth = {
            userId: userId
        }
    }
    catch(error) {
        res.status(401).json({ error });
    }
};