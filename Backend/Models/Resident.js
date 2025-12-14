const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
  name: String,
  flatNo: String,
  phone: String,
  email: String,
  status: { type: String, default: "ACTIVE" }
}, { timestamps: true });

module.exports = mongoose.model("Resident", ResidentSchema);
