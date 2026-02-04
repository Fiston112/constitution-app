const mongoose = require("mongoose");

const ChapitreSchema = new mongoose.Schema(
  {
    titreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Titre",
      required: true,
      index: true,
    },

    // ex: "Chapitre I" ou "Chapitre 1"
    numero: { type: String, required: true, trim: true },

    intitule: { type: String, required: true, trim: true },

    description: { type: String, default: "" },

    orderIndex: { type: Number, required: true, min: 0 },

    statut: { type: String, enum: ["publié", "brouillon"], default: "publié" },
  },
  { timestamps: true },
);

ChapitreSchema.index({ titreId: 1, orderIndex: 1 });
ChapitreSchema.index({ statut: 1, titreId: 1, orderIndex: 1 });

module.exports = mongoose.model("Chapitre", ChapitreSchema);
