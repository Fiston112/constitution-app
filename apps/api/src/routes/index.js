const router = require("express").Router();

const publicRoutes = require("./public.routes");
const adminRoutes = require("./admin.routes");
const authRoutes = require("./auth.routes");
const adminTitres = require("./admin.titres.routes");
const adminArticles = require("./admin.articles.routes");
const adminChapitres = require("./admin.chapitres.routes");

router.use("/admin/chapitres", adminChapitres);
router.use("/admin/articles", adminArticles);
router.use("/admin/titres", adminTitres);
router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/auth", authRoutes);
router.use("/public", publicRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
