const VisitorSchema = new mongoose.Schema({
  name: String,
  phone: String,
  photoUrl: String,
  vehicleNo: String,
  blacklisted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Visitor", VisitorSchema);
