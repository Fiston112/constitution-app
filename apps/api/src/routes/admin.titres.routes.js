const router = require("express").Router();
const { requireAuth } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const titres = require("../controllers/titres.controller");
const {
  createTitreSchema,
  updateTitreSchema,
  reorderTitresSchema,
} = require("../validators/titres.schema");

router.use(requireAuth);

router.get("/", titres.list);
router.post("/", validate(createTitreSchema), titres.create);
router.get("/:id", titres.getById);
router.put("/:id", validate(updateTitreSchema), titres.update);
router.delete("/:id", titres.remove);
router.patch("/reorder", validate(reorderTitresSchema), titres.reorder);

module.exports = router;
