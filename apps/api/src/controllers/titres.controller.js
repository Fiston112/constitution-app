const mongoose = require("mongoose");
const Titre = require("../models/Titre");
const { badRequest, notFound } = require("../utils/errors");

async function list(req, res, next) {
  try {
    const { statut } = req.query; // optionnel: publié|brouillon
    const filter = {};
    if (statut) filter.statut = statut;

    const titres = await Titre.find(filter).sort({
      orderIndex: 1,
      createdAt: 1,
    });
    res.json(titres);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const doc = await Titre.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    // ex: duplicate key ou validation mongoose
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return next(badRequest("Invalid id"));

    const doc = await Titre.findById(id);
    if (!doc) return next(notFound("Titre not found"));

    res.json(doc);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return next(badRequest("Invalid id"));

    const doc = await Titre.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(notFound("Titre not found"));
    res.json(doc);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return next(badRequest("Invalid id"));

    const doc = await Titre.findByIdAndDelete(id);
    if (!doc) return next(notFound("Titre not found"));

    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
}

async function reorder(req, res, next) {
  try {
    const { items } = req.body;

    const ops = items.map((it) => {
      if (!mongoose.isValidObjectId(it.id)) {
        throw badRequest("Invalid id in items");
      }
      return {
        updateOne: {
          filter: { _id: it.id },
          update: { $set: { orderIndex: it.orderIndex } },
        },
      };
    });

    await Titre.bulkWrite(ops);
    res.json({ message: "Reordered" });
  } catch (e) {
    next(e);
  }
}

module.exports = { list, create, getById, update, remove, reorder };
