const router = require("express").Router();
const pub = require("../controllers/public.controller");

// Lecture publique
router.get("/titres", pub.listTitres);
router.get("/titres/:id/chapitres", pub.listChapitresByTitre);
router.get("/chapitres/:id/articles", pub.listArticlesByChapitre);

// Synchro (⚠️ /articles AVANT /articles/:id)
router.get("/meta", pub.meta);
router.get("/articles", pub.articlesUpdatedSince);

// Détail article
router.get("/articles/:id", pub.getArticle);

// Recherche
router.get("/search", pub.search);

module.exports = router;
