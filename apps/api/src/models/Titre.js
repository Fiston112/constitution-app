const mongoose = require("mongoose");

const TitreSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    // ordre d’affichage dans le mobile
    orderIndex: { type: Number, required: true, min: 0 },

    statut: { type: String, enum: ["publié", "brouillon"], default: "publié" },
  },
  { timestamps: true },
);

TitreSchema.index({ orderIndex: 1 });
TitreSchema.index({ statut: 1, orderIndex: 1 });

module.exports = mongoose.model("Titre", TitreSchema);
