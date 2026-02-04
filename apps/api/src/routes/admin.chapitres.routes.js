const router = require("express").Router();

const { requireAuth } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

const chapitres = require("../controllers/chapitres.controller");
const {
  createChapitreSchema,
  updateChapitreSchema,
  reorderChapitresSchema,
} = require("../validators/chapitres.schema");

router.use(requireAuth);

router.get("/", chapitres.list);
router.post("/", validate(createChapitreSchema), chapitres.create);
router.get("/:id", chapitres.getById);
router.put("/:id", validate(updateChapitreSchema), chapitres.update);
router.delete("/:id", chapitres.remove);
router.patch("/reorder", validate(reorderChapitresSchema), chapitres.reorder);

module.exports = router;
