const VisitLog = require("../models/VisitLog");

exports.approveVisitor = async (req, res) => {
  const { visitId } = req.body;

  await VisitLog.findByIdAndUpdate(visitId, {
    status: "APPROVED"
  });

  res.json({ message: "Visitor approved" });
};
