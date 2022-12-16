const rateLimit = require("express-rate-limit");

// Pour limiter le nombre de requêtes à 100 par tranche de 15 minutes
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Pour limiter le nombre de création de compte à 1 seul par heure
exports.createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1,
  message: "Vous ne pouvez créer qu'un seul compte par heure.",
  standardHeaders: true,
  legacyHeaders: false,
});
