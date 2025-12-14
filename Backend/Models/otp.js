const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  visitId: { type: mongoose.Schema.Types.ObjectId, ref: "VisitLog" },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  otpHash: String,
  expiresAt: Date,
  verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Otp", OtpSchema);
