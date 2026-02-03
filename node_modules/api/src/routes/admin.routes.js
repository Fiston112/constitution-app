const router = require("express").Router();
const { requireAuth } = require("../middlewares/auth.middleware");

// Exemple : route admin protégée
router.get("/me", requireAuth, (req, res) => {
  res.json({ admin: req.user });
});

module.exports = router;
