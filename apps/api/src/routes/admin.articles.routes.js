const router = require("express").Router();

const { requireAuth } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

const articles = require("../controllers/articles.controller");
const {
  createArticleSchema,
  updateArticleSchema,
  reorderArticlesSchema,
} = require("../validators/articles.schema");

router.use(requireAuth);

router.get("/", articles.list);
router.post("/", validate(createArticleSchema), articles.create);
router.get("/:id", articles.getById);
router.put("/:id", validate(updateArticleSchema), articles.update);
router.delete("/:id", articles.remove);
router.patch("/reorder", validate(reorderArticlesSchema), articles.reorder);

module.exports = router;
