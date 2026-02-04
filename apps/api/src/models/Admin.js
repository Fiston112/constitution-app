const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    nom: { type: String },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
    actif: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
