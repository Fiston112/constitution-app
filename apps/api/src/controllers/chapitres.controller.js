const mongoose = require("mongoose");
const Chapitre = require("../models/Chapitre");
const { badRequest, notFound } = require("../utils/errors");

async function list(req, res, next) {
  try {
    const { titreId, statut } = req.query;

    const filter = {};
    if (titreId) {
      if (!mongoose.isValidObjectId(titreId))
        return next(badRequest("Invalid titreId"));
      filter.titreId = titreId;
    }
    if (statut) filter.statut = statut;

    const chapitres = await Chapitre.find(filter).sort({
      titreId: 1,
      orderIndex: 1,
      createdAt: 1,
    });
    res.json(chapitres);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const { titreId } = req.body;
    if (!mongoose.isValidObjectId(titreId))
      return next(badRequest("Invalid titreId"));

    const doc = await Chapitre.create({
      ...req.body,
      titreId: new mongoose.Types.ObjectId(titreId),
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

    const doc = await Chapitre.findById(id);
    if (!doc) return next(notFound("Chapitre not found"));

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
    if (payload.titreId) {
      if (!mongoose.isValidObjectId(payload.titreId))
        return next(badRequest("Invalid titreId"));
      payload.titreId = new mongoose.Types.ObjectId(payload.titreId);
    }

    const doc = await Chapitre.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(notFound("Chapitre not found"));
    res.json(doc);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return next(badRequest("Invalid id"));

    const doc = await Chapitre.findByIdAndDelete(id);
    if (!doc) return next(notFound("Chapitre not found"));

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

    await Chapitre.bulkWrite(ops);
    res.json({ message: "Reordered" });
  } catch (e) {
    next(e);
  }
}

module.exports = { list, create, getById, update, remove, reorder };
