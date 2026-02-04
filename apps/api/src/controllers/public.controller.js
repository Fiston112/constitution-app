const mongoose = require("mongoose");
const Titre = require("../models/Titre");
const Chapitre = require("../models/Chapitre");
const Article = require("../models/Article");
const { badRequest, notFound } = require("../utils/errors");

// ---------- Public: lecture ----------

async function listTitres(req, res, next) {
  try {
    const titres = await Titre.find({ statut: "publié" }).sort({
      orderIndex: 1,
      createdAt: 1,
    });
    return res.json(titres);
  } catch (e) {
    return next(e);
  }
}

async function listChapitresByTitre(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return next(badRequest("Invalid titre id"));

    // vérifier que le titre est publié
    const titre = await Titre.findOne({ _id: id, statut: "publié" }).select(
      "_id",
    );
    if (!titre) return next(notFound("Titre not found"));

    const chapitres = await Chapitre.find({
      titreId: id,
      statut: "publié",
    }).sort({
      orderIndex: 1,
      createdAt: 1,
    });

    return res.json(chapitres);
  } catch (e) {
    return next(e);
  }
}

async function listArticlesByChapitre(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return next(badRequest("Invalid chapitre id"));

    // vérifier que le chapitre est publié
    const chapitre = await Chapitre.findOne({
      _id: id,
      statut: "publié",
    }).select("_id");
    if (!chapitre) return next(notFound("Chapitre not found"));

    const articles = await Article.find({
      chapitreId: id,
      statut: "publié",
    }).sort({
      orderIndex: 1,
      createdAt: 1,
    });

    return res.json(articles);
  } catch (e) {
    return next(e);
  }
}

async function getArticle(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return next(badRequest("Invalid article id"));

    const article = await Article.findOne({ _id: id, statut: "publié" });
    if (!article) return next(notFound("Article not found"));

    return res.json(article);
  } catch (e) {
    return next(e);
  }
}

async function search(req, res, next) {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return next(badRequest("Missing query param q"));

    // recherche simple (regex). (On pourra remplacer par un index texte plus tard)
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");

    const articles = await Article.find({
      statut: "publié",
      $or: [{ numero: regex }, { contenu: regex }, { notes: regex }],
    })
      .sort({ updatedAt: -1 })
      .limit(50);

    return res.json({ q, count: articles.length, articles });
  } catch (e) {
    return next(e);
  }
}

// ---------- Public: synchro ----------

async function meta(req, res, next) {
  try {
    const [lastTitre, lastChapitre, lastArticle] = await Promise.all([
      Titre.findOne({ statut: "publié" })
        .sort({ updatedAt: -1 })
        .select("updatedAt"),
      Chapitre.findOne({ statut: "publié" })
        .sort({ updatedAt: -1 })
        .select("updatedAt"),
      Article.findOne({ statut: "publié" })
        .sort({ updatedAt: -1 })
        .select("updatedAt"),
    ]);

    const dates = [
      lastTitre?.updatedAt,
      lastChapitre?.updatedAt,
      lastArticle?.updatedAt,
    ].filter(Boolean);

    const lastUpdatedAt =
      dates.length > 0
        ? new Date(Math.max(...dates.map((d) => d.getTime())))
        : null;

    const [titresCount, chapitresCount, articlesCount] = await Promise.all([
      Titre.countDocuments({ statut: "publié" }),
      Chapitre.countDocuments({ statut: "publié" }),
      Article.countDocuments({ statut: "publié" }),
    ]);

    return res.json({
      lastUpdatedAt,
      counts: {
        titres: titresCount,
        chapitres: chapitresCount,
        articles: articlesCount,
      },
    });
  } catch (e) {
    return next(e);
  }
}

async function articlesUpdatedSince(req, res, next) {
  try {
    const updatedSince = String(req.query.updatedSince || "").trim();
    if (!updatedSince)
      return next(badRequest("Missing query param updatedSince"));

    const date = new Date(updatedSince);
    if (Number.isNaN(date.getTime())) {
      return next(badRequest("Invalid updatedSince date (use ISO string)"));
    }

    const articles = await Article.find({
      statut: "publié",
      updatedAt: { $gt: date },
    }).sort({ updatedAt: 1 });

    return res.json({
      updatedSince: date.toISOString(),
      count: articles.length,
      articles,
    });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  listTitres,
  listChapitresByTitre,
  listArticlesByChapitre,
  getArticle,
  search,
  meta,
  articlesUpdatedSince,
};
