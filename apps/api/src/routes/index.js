const router = require("express").Router();

const publicRoutes = require("./public.routes");
const adminRoutes = require("./admin.routes");

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/public", publicRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
