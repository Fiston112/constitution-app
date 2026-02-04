const mongoose = require("mongoose");
const Article = require("../models/Article");
const { badRequest, notFound } = require("../utils/errors");

async function list(req, res, next) {
  try {
    const { chapitreId, statut } = req.query;

    const filter = {};
    if (chapitreId) {
      if (!mongoose.isValidObjectId(chapitreId))
        return next(badRequest("Invalid chapitreId"));
      filter.chapitreId = chapitreId;
    }
    if (statut) filter.statut = statut;

    const articles = await Article.find(filter).sort({
      chapitreId: 1,
      orderIndex: 1,
      createdAt: 1,
    });
    res.json(articles);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const { chapitreId } = req.body;
    if (!mongoose.isValidObjectId(chapitreId))
      return next(badRequest("Invalid chapitreId"));

    const doc = await Article.create({
      ...req.body,
      chapitreId: new mongoose.Types.ObjectId(chapitreId),
    });

    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return next(badRequest("Invalid id"));

    const doc = await Article.findById(id);
    if (!doc) return next(notFound("Article not found"));

    res.json(doc);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return next(badRequest("Invalid id"));

    const payload = { ...req.body };
    if (payload.chapitreId) {
      if (!mongoose.isValidObjectId(payload.chapitreId))
        return next(badRequest("Invalid chapitreId"));
      payload.chapitreId = new mongoose.Types.ObjectId(payload.chapitreId);
    }

    const doc = await Article.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(notFound("Article not found"));
    res.json(doc);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return next(badRequest("Invalid id"));

    const doc = await Article.findByIdAndDelete(id);
    if (!doc) return next(notFound("Article not found"));

    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
}

async function reorder(req, res, next) {
  try {
    const { items } = req.body;

    const ops = items.map((it) => {
      if (!mongoose.isValidObjectId(it.id))
        throw badRequest("Invalid id in items");
      return {
        updateOne: {
          filter: { _id: it.id },
          update: { $set: { orderIndex: it.orderIndex } },
        },
      };
    });

    await Article.bulkWrite(ops);
    res.json({ message: "Reordered" });
  } catch (e) {
    next(e);
  }
}

module.exports = { list, create, getById, update, remove, reorder };
