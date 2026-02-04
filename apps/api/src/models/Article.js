const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    chapitreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapitre",
      required: true,
      index: true,
    },

    // ex: "Article 10" ou juste 10
    numero: { type: String, required: true, trim: true },

    contenu: { type: String, required: true },

    notes: { type: String, default: "" }, // alinéas / notes (optionnel)

    orderIndex: { type: Number, required: true, min: 0 }, // ordre dans le chapitre

    statut: { type: String, enum: ["publié", "brouillon"], default: "publié" },
  },
  { timestamps: true },
);

ArticleSchema.index({ chapitreId: 1, orderIndex: 1 });
ArticleSchema.index({ statut: 1, updatedAt: -1 });

module.exports = mongoose.model("Article", ArticleSchema);
