const jwtokn = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwtokn.verify(token, process.env.JWT_TOKEN);
    const userId = decodeToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      res.status(403).json({ message: "Autorisation refusée." });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
