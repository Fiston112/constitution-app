const router = require("express").Router();
const { validate } = require("../middlewares/validate.middleware");
const { loginSchema } = require("../validators/auth.schema");
const { requireAuth } = require("../middlewares/auth.middleware");
const auth = require("../controllers/auth.controller");

router.post("/login", auth.login);
router.post("/refresh", auth.refresh);
router.post("/logout", auth.logout);

module.exports = router;
