const mongoose = require("mongoose");

const QRPassSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  visitorName: String,
  visitorPhone: String,
  validFrom: Date,
  validTo: Date,
  used: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("QRPass", QRPassSchema);
