const VisitLogSchema = new mongoose.Schema({
  visitorId: { type: mongoose.Schema.Types.ObjectId, ref: "Visitor" },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  guardId: { type: mongoose.Schema.Types.ObjectId, ref: "Guard" },
  entryTime: Date,
  exitTime: Date,
  approvalType: String,
  status: { type: String, default: "PENDING" }
}, { timestamps: true });

module.exports = mongoose.model("VisitLog", VisitLogSchema);
